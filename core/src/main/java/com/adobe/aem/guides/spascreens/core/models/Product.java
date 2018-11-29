package com.adobe.aem.guides.spascreens.core.models;

import java.util.List;

import org.osgi.annotation.versioning.ConsumerType;

import com.adobe.aem.guides.spascreens.core.commerce.ProductFilter;
import com.adobe.cq.export.json.ComponentExporter;

@ConsumerType
public interface Product extends ComponentExporter {
	
	public static final String PN_FEATURES = "features";
    public static final String PN_SUMMARY = "splFeatures";
    public static final String PN_HEIGHT = "productHeight";
    public static final String PN_WIDTH = "productWidth";
    public static final String PN_DEPTH = "productDepth";
    
	public String getName();
	
	public String getTitle();
	
	public String getSKU();
	
	public String getCategory();
	
	public String getImage();
	
	public List<HotSpot> getHotSpots();
	
	public List<ProductFeature> getFeatures();
	
	public List<ProductInspiration> getInspirationAssets();
	
	public String getSpecifications();
	
	public String getHeight();
	
	public String getWidth(); 
	
	public String getDepth();
	
	public ProductFilter getFilter();
	
	public String getProductPage();
	
	public void setReadInspirationAssets(Boolean readInspirationAssets);
}
