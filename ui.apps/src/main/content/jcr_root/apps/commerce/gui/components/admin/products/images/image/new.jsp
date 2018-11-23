<%--
  ADOBE CONFIDENTIAL

  Copyright 2015 Adobe Systems Incorporated
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
          import="org.apache.sling.api.resource.Resource,
          com.adobe.granite.ui.components.ExpressionCustomizer" %><%

    String resourcePath = resource.getPath();

    Resource itemRes = resourceResolver.getResource(slingRequest.getRequestPathInfo().getSuffix());
    if (itemRes == null) {
        itemRes = resourceResolver.getResource(request.getParameter("item"));
    }
    String productPath = (itemRes != null)? itemRes.getPath() : "";
    ExpressionCustomizer expressionCustomizer = ExpressionCustomizer.from(request);
    expressionCustomizer.setVariable("imageRelPath", "");
%><div class="product-image"
       data-resource-path="<%=xssAPI.encodeForHTMLAttr(resourcePath)%>"
       data-product-path="<%=xssAPI.encodeForHTMLAttr(productPath)%>"
       data-product-image-path=""
       data-product-image-reference-path="" >

    <sling:include resource="<%= resource.getChild("thumbnail")%>"/>

</div>

