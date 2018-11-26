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

  Selector based ("create") POST script that creates a product asset.

  ==============================================================================


--%><%
%><%@include file="/libs/granite/ui/global.jsp" %><%
%><%@page session="false"
          import="java.util.Map,
                  java.util.HashMap,
                  org.apache.sling.api.resource.Resource,
                  org.apache.sling.api.resource.ModifiableValueMap,
                  com.adobe.cq.commerce.api.Product,
                  com.adobe.cq.commerce.api.asset.ProductAssetManager" %>

<%

    String productPath = request.getParameter("productPath");
    Resource productRes = resourceResolver.getResource(productPath);
    if (productRes == null) {
        return;
    }
    Product product = productRes.adaptTo(Product.class);
    ProductAssetManager productAssetManager = resourceResolver.adaptTo(ProductAssetManager.class);

    String assetReference = request.getParameter("assetReference");

    Resource assetRes = productAssetManager.addAsset(product, assetReference);
    String assetResPath = assetRes.getPath();


	String featureTitle = request.getParameter("featureTitle");
	String featureDescription = request.getParameter("featureDescription");

    Resource productAssetRes = productAssetManager.updateAsset(assetResPath, assetReference);



	//START writing title and description of feature 
		Map<String, Object> productAssetProperties = new HashMap<String, Object>();
        Map<String, Object> currentProps = assetRes.adaptTo(ModifiableValueMap.class);
        // add the new properties and update existing ones
        productAssetProperties.putAll(currentProps);
        productAssetProperties.put("featureTitle", featureTitle);
 		productAssetProperties.put("featureDescription", featureDescription);
 		productAssetManager.updateAsset(assetResPath, productAssetProperties);
	//END writing title and description of feature 


    // add the asset category to the product asset
    String[] assetCategory = request.getParameterValues("assetCategory");

    if (assetCategory != null) {
        //Map<String, Object> 
        productAssetProperties = new HashMap<String, Object>();
        //Map<String, Object>
        currentProps = assetRes.adaptTo(ModifiableValueMap.class);
        // add the new properties and update existing ones
        productAssetProperties.putAll(currentProps);
        productAssetProperties.put("assetCategory", assetCategory);

        productAssetManager.updateAsset(assetResPath, productAssetProperties);
    }

%><div class="product-asset-path"
       data-product-asset-path="<%=xssAPI.encodeForHTMLAttr(assetResPath)%>" >
</div>
