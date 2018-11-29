package com.adobe.aem.guides.spascreens.core.models.impl;

import java.util.Arrays;
import java.util.List;

import com.adobe.aem.guides.spascreens.core.models.HotSpot;

public class HotSpotImpl implements HotSpot {
	
	private String shape;
	private String coordinates;
	private String destinationPath;
	private String target;
	private String altText;

	public HotSpotImpl(String imageMap) {
		
		List<String> imageMapItems = Arrays.asList(imageMap.replaceAll("\"","").split("\\|"));
		
		for(int i=0; i< imageMapItems.size(); i++) {
			if (i==0) {
				List<String> imageMapDetails = Arrays.asList(imageMapItems.get(i).split("\\(|\\)"));
				for(int j=0; j< imageMapDetails.size(); j++) {
					if (j==0) {
						this.shape = (imageMapDetails.get(j) != null) ? imageMapDetails.get(j) : "";
					}
					if (j==1) {
						this.coordinates = (imageMapDetails.get(j) != null) ? imageMapDetails.get(j) : "";
					}
					if (j==2) {
						this.destinationPath = (imageMapDetails.get(j) != null) ? imageMapDetails.get(j) : "";
					}
				}
			}
			if (i==1) {
				this.target = (imageMapItems.get(i) != null) ? imageMapItems.get(i) : "";
			}
			if (i==2) {
				this.altText = (imageMapItems.get(i) != null) ? imageMapItems.get(i) : "";
			}
		}
		
	}

	@Override
	public String getShape() {
		return shape;
	}

	@Override
	public String getCoordinates() {
		return coordinates;
	}

	@Override
	public String getDestinationPath() {
		return destinationPath;
	}
	
	@Override
	public String getTarget() {
		return target;
	}
	
	@Override
	public String getAltText() {
		return altText;
	}

}
