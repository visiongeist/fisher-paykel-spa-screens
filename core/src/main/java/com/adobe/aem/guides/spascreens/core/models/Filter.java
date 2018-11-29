package com.adobe.aem.guides.spascreens.core.models;

import java.util.List;

import org.osgi.annotation.versioning.ConsumerType;


import com.adobe.cq.export.json.ComponentExporter;

@ConsumerType
public interface Filter extends ComponentExporter {
	
	public static final String FB_FILTERBY= "filterBy";
    public static final String FB_VALUES = "value";
    
    public String getFilterBy();
    
    public String[] getValues();
    
}
