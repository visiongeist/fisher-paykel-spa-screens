package com.adobe.aem.guides.spascreens.core.models.impl;

import java.util.List;

import com.adobe.aem.guides.spascreens.core.models.Product;
import com.adobe.aem.guides.spascreens.core.models.ProductInspiration;

public class ProductInspirationImpl implements ProductInspiration {
	
	private String imagePath;
	private List<Product> relatedProducts;

	public ProductInspirationImpl(String imagePath, List<Product> relatedProducts) {
		this.imagePath = imagePath;
		this.relatedProducts = relatedProducts;
	}

	@Override
	public String getImagePath() {
		return imagePath;
	}

	@Override
	public List<Product> getRelatedProducts() {
		return relatedProducts;
	}

}
