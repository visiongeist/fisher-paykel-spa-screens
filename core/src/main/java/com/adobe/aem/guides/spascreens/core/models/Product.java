package com.adobe.aem.guides.spascreens.core.models;

import java.util.List;

import com.adobe.aem.guides.spascreens.core.commerce.ProductFilter;

public interface Product {
	
	public String getName();
	
	public String getTitle();
	
	public String getSKU();
	
	public ProductCategory getCategory();
	
	public String getImage();
	
	public List<ProductFeature> getFeatures();
	
	public String getSpecifications();
	
	public ProductFilter getFilter();
	
	

}
