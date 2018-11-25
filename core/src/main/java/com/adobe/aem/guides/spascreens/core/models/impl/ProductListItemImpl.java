/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~ Copyright 2017 Adobe Systems Incorporated
 ~
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~ you may not use this file except in compliance with the License.
 ~ You may obtain a copy of the License at
 ~
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ Unless required by applicable law or agreed to in writing, software
 ~ distributed under the License is distributed on an "AS IS" BASIS,
 ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~ See the License for the specific language governing permissions and
 ~ limitations under the License.
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
package com.adobe.aem.guides.spascreens.core.models.impl;

import java.util.Calendar;
import java.util.LinkedHashSet;
import java.util.Set;

import javax.annotation.Nonnull;

import org.apache.commons.lang3.StringUtils;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.resource.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.adobe.aem.guides.spascreens.core.internal.Utils;
import com.adobe.aem.guides.spascreens.core.models.ListItem;
import com.adobe.aem.guides.spascreens.core.models.Product;
import com.day.cq.wcm.api.Page;
import com.day.cq.wcm.api.PageManager;

public class ProductListItemImpl implements ListItem {

    private static final Logger LOGGER = LoggerFactory.getLogger(ProductListItemImpl.class);
    
    public static final String PN_REDIRECT_TARGET = "cq:redirectTarget";
    
    protected SlingHttpServletRequest request;
    protected Page page;
    protected Product product;

    public ProductListItemImpl(@Nonnull SlingHttpServletRequest request, @Nonnull Page page) {
        this.request = request;
        this.page = page;
        
        this.product = populateProduct();
        if(product != null) {
        	this.product.setReadInspirationAssets(false);
            LOGGER.info("Product: " + product);
        }
        
        Page redirectTarget = getRedirectTarget(page);
        if (redirectTarget != null && !redirectTarget.equals(page)) {
            this.page = redirectTarget;
        }
    }

	@Override
    public String getURL() {
        return Utils.getURL(request, page);
    }

    @Override
    public String getTitle() {
    	String title = null;
    	
    	if(product != null) {
    		title = product.getTitle();
    	}
        if (title == null) {
        	title = page.getNavigationTitle();
        }
        if (title == null) {
            title = page.getPageTitle();
        }
        if (title == null) {
            title = page.getTitle();
        }
        if (title == null) {
            title = page.getName();
        }
        return title;
    }

    @Override
    public String getDescription() {
        return page.getDescription();
    }

    @Override
    public Calendar getLastModified() {
        return page.getLastModified();
    }

    @Override
    public String getPath() {
        return page.getPath();
    }
    
    @Override
    public String getImage() {
    	return product.getImage();
    }
    
    public Product getProduct() {
    	return product;
    }

    private Page getRedirectTarget(@Nonnull Page page) {
        Page result = page;
        String redirectTarget;
        PageManager pageManager = page.getPageManager();
        Set<String> redirectCandidates = new LinkedHashSet<>();
        redirectCandidates.add(page.getPath());
        while (result != null && StringUtils.isNotEmpty((redirectTarget = result.getProperties().get(PN_REDIRECT_TARGET, String.class)))) {
            result = pageManager.getPage(redirectTarget);
            if (result != null) {
                if (!redirectCandidates.add(result.getPath())) {
                    LOGGER.warn("Detected redirect loop for the following pages: {}.", redirectCandidates.toString());
                    break;
                }
            }
        }
        return result;
    }
    
    private Product populateProduct() {
    	LOGGER.info("Processing Product: " + this.page.getContentResource().getPath() + ProductImpl.PN_PRODUCT_COMPONENT_REFERENCE);
		Resource productRes = this.page.getContentResource().getResourceResolver().getResource(this.page.getContentResource().getPath() + ProductImpl.PN_PRODUCT_COMPONENT_REFERENCE);
		
		if(productRes != null) {
			return productRes.adaptTo(Product.class);
		} else {
			return null;
		}
	}

}
