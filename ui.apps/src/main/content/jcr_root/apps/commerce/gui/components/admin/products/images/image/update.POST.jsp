<%--
  ADOBE CONFIDENTIAL

  Copyright 2014 Adobe Systems Incorporated
  All Rights Reserved.

  NOTICE:  All information contained herein is, and remains
  the property of Adobe Systems Incorporated and its suppliers,
  if any.  The intellectual and technical concepts contained
  herein are proprietary to Adobe Systems Incorporated and its
  suppliers and may be covered by U.S. and Foreign Patents,
  patents in process, and are protected by trade secret or copyright law.
  Dissemination of this information or reproduction of this material
  is strictly forbidden unless prior written permission is obtained
  from Adobe Systems Incorporated.

  ==============================================================================

  Product asset UI component

  Selector based ("update") POST script that updates a product asset.

  ==============================================================================


--%><%
%><%@include file="/libs/granite/ui/global.jsp" %><%
%><%@page session="false"
          import="java.util.Map,
                  java.util.HashMap,
                  org.apache.sling.api.resource.Resource,
                  org.apache.sling.api.resource.ModifiableValueMap,
                  com.adobe.cq.commerce.api.asset.ProductAssetManager" %>

 <%

    ProductAssetManager productAssetManager = resourceResolver.adaptTo(ProductAssetManager.class);

    String productAssetPath = request.getParameter("productAssetPath");
    String assetReference = request.getParameter("assetReference");
 	String featureTitle = request.getParameter("featureTitle");
	String featureDescription = request.getParameter("featureDescription");

	log.info("Title :"+featureTitle+ " Description :"+featureDescription);

    Resource productAssetRes = productAssetManager.updateAsset(productAssetPath, assetReference);

	//START writing title and description of feature 
		Map<String, Object> productAssetProperties = new HashMap<String, Object>();
        Map<String, Object> currentProps = productAssetRes.adaptTo(ModifiableValueMap.class);
        // add the new properties and update existing ones
        productAssetProperties.putAll(currentProps);
        productAssetProperties.put("featureTitle", featureTitle);
 		productAssetProperties.put("featureDescription", featureDescription);
 		productAssetManager.updateAsset(productAssetPath, productAssetProperties);
	//END writing title and description of feature 

    // add the asset category to the product asset
    String[] assetCategory = request.getParameterValues("assetCategory");


    if (assetCategory != null) {
        //Map<String, Object> 
        productAssetProperties = new HashMap<String, Object>();
        //Map<String, Object>
        currentProps = productAssetRes.adaptTo(ModifiableValueMap.class);

        // add the new properties and update existing ones
        productAssetProperties.putAll(currentProps);
        productAssetProperties.put("assetCategory", assetCategory);
        productAssetManager.updateAsset(productAssetPath, productAssetProperties);
    }

%>