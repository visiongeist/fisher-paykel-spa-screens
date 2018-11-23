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
--%><%
%><%@include file="/libs/granite/ui/global.jsp" %><%
%><%@page session="false"
          import="java.util.HashMap,
                  java.util.Map,
                  org.apache.sling.api.resource.Resource,
                  com.adobe.cq.commerce.api.asset.ProductAssetManager,
                  com.adobe.granite.ui.components.ExpressionCustomizer" %><%

    String resourcePath = resource.getPath();

    String imagePath = null;
    if (request.getParameter("imagePath") != null) {
        imagePath = request.getParameter("imagePath");
    }
    if (imagePath == null) {
        imagePath = (String) request.getAttribute("cq-product-image-path");
    }
    if (imagePath == null) {
        return;
    }

    String productPath = null;
    if (request.getParameter("productPath") != null) {
        productPath = request.getParameter("productPath");
    }
    if (productPath == null) {
        productPath = (String) request.getAttribute("cq-product-path");
    }
    if (productPath == null) {
        return;
    }

    boolean isAbsoluteImageUrl = imagePath.startsWith("http://") || imagePath.startsWith("https://");
    String referencePath = "";
    if (!isAbsoluteImageUrl) {
	    Resource imageRes = resourceResolver.getResource(imagePath);
	    if (imageRes == null || imageRes.getParent() == null || imageRes.getParent().getParent() == null) {
	        return;
	    }
	    // if the variant does not have an asset
	    if (!imagePath.startsWith(productPath)) {
	        return;
	    }

	    ProductAssetManager productAssetManager = resourceResolver.adaptTo(ProductAssetManager.class);
	    referencePath = productAssetManager.getReferencedAsset(imagePath);
	
	    // retrieve the asset relative path: e.g. images/imageXX or image
	    String imageRelPath = imagePath.substring(productPath.length()+1);
	    Map<String,String> templateProperties = new HashMap<String, String>();
	    templateProperties.put("${imageRelPath}", imageRelPath);
	
	    ExpressionCustomizer expressionCustomizer = ExpressionCustomizer.from(request);
	    expressionCustomizer.setVariable("imageRelPath", imageRelPath);
	    
	    // retrieve the asset property name: video -> "asset", other types -> "fileReference"
	    String imagePropName = "foundation/components/video".equals(imageRes.getResourceType())? "asset": "fileReference";
	    templateProperties.put("${imagePropName}", imagePropName);
	
	    request.setAttribute("cq-template-properties", templateProperties);
    }

%><div class="product-image"
       data-resource-path="<%=xssAPI.encodeForHTMLAttr(resourcePath)%>"
       data-product-path="<%=xssAPI.encodeForHTMLAttr(productPath)%>"
       data-product-image-path="<%=xssAPI.encodeForHTMLAttr(imagePath)%>"
       data-product-image-reference-path="<%=xssAPI.encodeForHTMLAttr(referencePath)%>" >

    <sling:include resource="<%= resource.getChild("thumbnail")%>"/>

</div>

