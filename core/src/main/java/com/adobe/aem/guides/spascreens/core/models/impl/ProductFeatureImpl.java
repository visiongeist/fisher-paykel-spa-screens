package com.adobe.aem.guides.spascreens.core.models.impl;

import org.apache.sling.api.resource.ValueMap;

import com.adobe.aem.guides.spascreens.core.models.ProductFeature;

public class ProductFeatureImpl implements ProductFeature {
	
	private static final String PN_FEATURE_TITLE = "featureTitle";
	private static final String PN_FEATURE_DESCRIPTION = "featureDescription";
	private static final String PN_FEATURE_IMAGE_PATH = "fileReference";
	
	private String title;
	private String description;
	private String imagePath;

	public ProductFeatureImpl(ValueMap featureMap) {
		this.title = featureMap.get(PN_FEATURE_TITLE, String.class);
		if(this.title == null) {
			this.title = "";
		}
		
		this.description = featureMap.get(PN_FEATURE_DESCRIPTION, String.class);
		if(this.description == null) {
			this.description = "";
		}
		
		this.imagePath = featureMap.get(PN_FEATURE_IMAGE_PATH, String.class);
		if(this.imagePath == null) {
			this.imagePath = "";
		}
	}

	@Override
	public String getTitle() {
		return title;
	}

	@Override
	public String getDescription() {
		return description;
	}

	@Override
	public String getImagePath() {
		return imagePath;
	}

}
