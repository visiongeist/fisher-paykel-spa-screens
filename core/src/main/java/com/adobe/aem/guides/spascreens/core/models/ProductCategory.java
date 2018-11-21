package com.adobe.aem.guides.spascreens.core.models;

import java.util.List;

import com.adobe.aem.guides.spascreens.core.commerce.ProductFilter;

public interface ProductCategory {
	
	public List<Product> getProducts();
	
	public ProductFilter getFilter();

}
