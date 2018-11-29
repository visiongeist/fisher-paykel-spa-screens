package com.adobe.aem.guides.spascreens.core.models.impl;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.PathNotFoundException;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.Value;
import javax.jcr.ValueFormatException;
import javax.jcr.query.Query;
import javax.jcr.query.QueryManager;
import javax.jcr.query.QueryResult;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Default;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.SlingObject;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.aem.guides.spascreens.core.commerce.ProductFilter;
import com.adobe.aem.guides.spascreens.core.models.Product;
import com.adobe.aem.guides.spascreens.core.models.ProductFeature;
import com.adobe.aem.guides.spascreens.core.models.HotSpot;
import com.adobe.aem.guides.spascreens.core.models.ProductInspiration;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;
import com.day.cq.wcm.foundation.Image;

@Model(adaptables = {Resource.class, SlingHttpServletRequest.class}, adapters = {Product.class, ComponentExporter.class}, resourceType = ProductImpl.RESOURCE_TYPE)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class ProductImpl implements Product {

	public static final String PN_PRODUCT_COMPONENT_REFERENCE = "/root/responsivegrid/product";

	protected static final String RESOURCE_TYPE = "spa-screens/components/content/product";

	private static final Logger LOGGER = LoggerFactory.getLogger(ProductImpl.class);

	@SlingObject
	private ResourceResolver resourceResolver;

	@SlingObject
	private Resource resource;

	@ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL)
	@Default(values = StringUtils.EMPTY)
	private String productPath;

	private List<ProductFeature> features;
	private PageManager pageManager;
	private com.adobe.cq.commerce.api.Product product;
	private Page page;
	private List<ProductInspiration> inspirationAssets;
	private Resource productResource;
	private String specifications;
	private List<HotSpot> hotSpots;
	
	private Boolean readInspirationAssets = true;

	@PostConstruct
	private void initModel() throws ValueFormatException, PathNotFoundException, RepositoryException {
		pageManager = resourceResolver.adaptTo(PageManager.class);
		readProperties();
		readFeatures();
		readHotSpots();
	}

	private void readInspirationAssets() throws ValueFormatException, PathNotFoundException, RepositoryException {
		Value[] subPages = product.adaptTo(Node.class).hasProperty("cq:tags") ? product.adaptTo(Node.class).getProperty("cq:tags").getValues():null;

		if(null!=subPages && subPages.length>0) {
			String tagToSearchInImg = subPages[0].getString();

			String sqlForImgSearch = "SELECT * FROM [nt:unstructured] AS s WHERE ISDESCENDANTNODE(s, [/content/dam/fishers/inspiration]) AND CONTAINS(s.[cq:tags], '"+tagToSearchInImg+"')";
			LOGGER.info("Image search query :" + sqlForImgSearch);

			QueryManager queryManager = resourceResolver.adaptTo(Session.class).getWorkspace().getQueryManager();
			Query query = queryManager.createQuery(sqlForImgSearch, Query.JCR_SQL2);
			QueryResult result = query.execute();
			NodeIterator it = result.getNodes();
			
			int imgCount = 0;
			if(null!=it) {
				inspirationAssets = new ArrayList<>();
				while(it.hasNext() && imgCount==0) {
					imgCount ++;
					Node imgMetadataNode = (Node)it.next();
					ProductInspiration inspiration = null;
					try {
						String imagePath = imgMetadataNode.getParent().getParent().getPath();
						Value[] tagsInImage = imgMetadataNode.hasProperty("cq:tags") ? imgMetadataNode.getProperty("cq:tags").getValues() : null;
						List<Product> productModelList = new ArrayList<Product>();
						for(Value v: tagsInImage){
							String individualTag = v.getString();
							if(tagToSearchInImg != individualTag){
								String sqlForProdSearch ="SELECT * FROM [nt:unstructured] AS s WHERE ISDESCENDANTNODE(s, [/var/commerce/products/fishers]) AND s.[cq:tags] LIKE '%"+individualTag+"%'";
								LOGGER.info("Product search query :"+sqlForProdSearch);

								query = queryManager.createQuery(sqlForProdSearch, Query.JCR_SQL2);

								QueryResult prodResult = query.execute();
								NodeIterator prodNodesItr = prodResult.getNodes();
								
//								productModelList.add(this);
								if(resource != null) {
									Product copy = resource.adaptTo(Product.class);
									copy.setReadInspirationAssets(false);
									productModelList.add(copy);
								}
								
								if(null != prodNodesItr) {
									while (prodNodesItr.hasNext()) {
										Node productNode = (Node) prodNodesItr.next();
										Resource productRes = resourceResolver.getResource(productNode.getPath());
										if(!productPath.equals(productRes.getPath()));
										Page productPage = pageManager.getPage(productPagePathRetriever(productRes.getPath()));
										if(productPage != null) {
											Resource pRes = productPage.getContentResource().getResourceResolver().getResource(productPage.getContentResource().getPath() + ProductImpl.PN_PRODUCT_COMPONENT_REFERENCE);
											
											Product p = pRes.adaptTo(Product.class);
											p.setReadInspirationAssets(false);
											productModelList.add(p);
										}
										
										
									}
								}
								
							}
						}
						inspiration = new ProductInspirationImpl(imagePath, productModelList);
					} catch(Exception e) {
						LOGGER.error("Error :"+e.getMessage(),e);
					}
					if(inspiration != null) {
						inspirationAssets.add(inspiration);
						LOGGER.info("INSPIRATION ADDED FOR IMAGE :"+imgMetadataNode.getPath());
					}
				}
			}
		}

	}

	private void readFeatures() {
		features = new ArrayList<>();
		List<Resource> featuresList = product.getAssets();
		boolean isFirst = true;
		for(Resource featureRes: featuresList) {
			if(!isFirst) {
				ProductFeature feature = new ProductFeatureImpl(featureRes.getValueMap());
				features.add(feature);
			} else {
				isFirst = false;
			}
		}
	}

	private void readProperties() {
		productResource = resourceResolver.getResource(productPath);
		specifications =  productResource.getValueMap().get(Product.PN_SUMMARY, String.class);
		page = pageManager.getContainingPage(resource);
		product = productResource.adaptTo(com.adobe.cq.commerce.api.Product.class);
	}
	
	private void readHotSpots() {
		hotSpots = new ArrayList<>();
		List<Resource> featuresList = product.getAssets();
		Resource featureRes = featuresList.get(0);
		ProductFeature feature = new ProductFeatureImpl(featureRes.getValueMap());
		String imageUrl = feature != null ? feature.getImagePath() : "";
        Resource assetResource = resourceResolver.getResource(imageUrl + "/jcr:content/metadata");
        ValueMap metadata = assetResource.adaptTo(ValueMap.class);
        String imageMap =  (metadata != null) ? metadata.get(Image.PN_IMAGE_MAP, "") : "";
        imageMap = imageMap.replaceAll("^\\[|\\]$","");
        List<String> imageMapItems = Arrays.asList(imageMap.split("\\]\\["));
		for(String imgMap: imageMapItems) {
				HotSpot imgMaps = new HotSpotImpl(imgMap);
				hotSpots.add(imgMaps);
		}
	}
	
	public String productPagePathRetriever(String prodPath){
		String pathOfPage = "#";
		String sqlForImgSearch = "SELECT * FROM [nt:unstructured] AS s WHERE ISDESCENDANTNODE(s, [/content/spa-screens/]) AND s.[productPath] = '"+prodPath+"'";
		QueryManager queryManager;
		try {
			queryManager = resourceResolver.adaptTo(Session.class).getWorkspace().getQueryManager();
			Query query = queryManager.createQuery(sqlForImgSearch, Query.JCR_SQL2);

			QueryResult result = query.execute();
			NodeIterator it = result.getNodes();

			if (null != it) {
				Node prodComponentNode = (Node)it.next();
				//LOG.info("Start value for prodComponentNode :"+prodComponentNode.getPath());

				while(!"cq:Page".equalsIgnoreCase(prodComponentNode.getProperty("jcr:primaryType").getString())) {
					prodComponentNode = prodComponentNode.getParent();
					//LOG.info("New value for prodComponentNode :"+prodComponentNode.getPath());
					//LOG.info(" TYpe is prodComponentNode :"+prodComponentNode.getProperty("jcr:primaryType").getString());
				}
				pathOfPage = prodComponentNode.getPath();
				//LOG.info("Page path is : "+pathOfPage);
			}
		} catch(Exception e) {
			LOGGER.error("Error in productPagePathRetriever :" + e.getMessage(), e);
		}
		return pathOfPage;

	}

	@Override
	public String getName() {
		return product.getTitle();
	}

	@Override
	public String getTitle() {
		return product.getTitle();
	}

	@Override
	public String getSKU() {
		return product.getSKU();
	}

	@Override
	public String getCategory() {
		if(page != null) {
			return page.getParent().getTitle();
		}
		return "";
	}

	@Override
	public String getImage() {
		List<Resource> featuresList = product.getAssets();
		Resource featureRes = featuresList.get(0);
		ProductFeature feature = new ProductFeatureImpl(featureRes.getValueMap());
		String imageUrl = feature != null ? feature.getImagePath() : null;
		return imageUrl;
	}
	
	@Override
	public List<HotSpot> getHotSpots() {
		return hotSpots;
	}

	@Override
	public List<ProductFeature> getFeatures() {
		return features;
	}

	@Override
	public String getSpecifications() {
		return specifications;
	}

	@Override
	public List<ProductInspiration> getInspirationAssets() {
		if(readInspirationAssets) {
			try {
				readInspirationAssets();
				return inspirationAssets;
			} catch (ValueFormatException e) {
				LOGGER.error("Error Reading Inspiration Assets", e);
			} catch (PathNotFoundException e) {
				LOGGER.error("Error Reading Inspiration Assets", e);
			} catch (RepositoryException e) {
				LOGGER.error("Error Reading Inspiration Assets", e);
			}
		}
		return new ArrayList<>();
	}

	@Override
	public ProductFilter getFilter() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getExportedType() {
		return resource.getResourceType();
	}

	@Override
	public String getProductPage() {
		if(page != null) {
			return page.getPath() + ".html";
		}
		return "";
	}
	
	@Override
	public void setReadInspirationAssets(Boolean readInspirationAssets) {
		this.readInspirationAssets = readInspirationAssets;
	}

}
