package com.adobe.aem.guides.spascreens.core.models;

import com.adobe.cq.wcm.core.components.models.ListItem;

public interface List extends com.adobe.cq.wcm.core.components.models.List {
	
	public String getRenderType();
	
	public String getTitle();
	
	public String getSelectedCategory();
	
	public java.util.List<ListItem> getCategories();
	
}
