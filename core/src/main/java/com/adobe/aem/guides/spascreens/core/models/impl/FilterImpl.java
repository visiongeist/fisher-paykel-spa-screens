package com.adobe.aem.guides.spascreens.core.models.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.jcr.Node;
import javax.jcr.NodeIterator;
import javax.jcr.PathNotFoundException;
import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.Value;
import javax.jcr.ValueFormatException;


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
import org.apache.sling.models.annotations.injectorspecific.ScriptVariable;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.aem.guides.spascreens.core.commerce.ProductFilter;
import com.adobe.aem.guides.spascreens.core.models.Filter;
import com.adobe.cq.export.json.ComponentExporter;
import com.adobe.cq.export.json.ExporterConstants;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

@Model(adaptables = {Resource.class, SlingHttpServletRequest.class}, adapters = {Filter.class, ComponentExporter.class}, resourceType = FilterImpl.RESOURCE_TYPE)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class FilterImpl implements Filter {

	protected static final String RESOURCE_TYPE = "spa-screens/components/content/filter";

	private static final Logger LOGGER = LoggerFactory.getLogger(FilterImpl.class);

	
	@ScriptVariable
    private ValueMap properties;
	
	@SlingObject
	private ResourceResolver resourceResolver;

	@SlingObject
	private Resource resource;
	
	private PageManager pageManager;
	
	
	private String filterBy;
	private String[] values;
	

	@PostConstruct
	private void initModel() throws ValueFormatException, PathNotFoundException, RepositoryException {
		pageManager = resourceResolver.adaptTo(PageManager.class);
		readProperties();
	}

	private void readProperties() {
		filterBy = properties.get(Filter.FB_FILTERBY, String.class);
		values = properties.get(Filter.FB_VALUES, String[].class);
	}
	
	@Override
	public String getFilterBy() {
		return filterBy;
	}
	
	@Override
	public String[] getValues() {
		return values;
	}
	
	@Override
	public String getExportedType() {
		return resource.getResourceType();
	}

}
