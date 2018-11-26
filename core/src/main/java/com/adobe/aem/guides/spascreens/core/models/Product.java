package com.adobe.aem.guides.spascreens.core.models;

import java.util.List;

import org.osgi.annotation.versioning.ConsumerType;

import com.adobe.aem.guides.spascreens.core.commerce.ProductFilter;
import com.adobe.cq.export.json.ComponentExporter;

@ConsumerType
public interface Product extends ComponentExporter {
	
	public static final String PN_FEATURES = "features";
    public static final String PN_SUMMARY = "splFeatures";
	
	public String getName();
	
	public String getTitle();
	
	public String getSKU();
	
	public String getCategory();
	
	public String getImage();
	
	public List<ProductFeature> getFeatures();
	
	public List<ProductInspiration> getInspirationAssets();
	
	public String getSpecifications();
	
	public ProductFilter getFilter();
	
	public String getProductPage();
	
	public void setReadInspirationAssets(Boolean readInspirationAssets);
}
