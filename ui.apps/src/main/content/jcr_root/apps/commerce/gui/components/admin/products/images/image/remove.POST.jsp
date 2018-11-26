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

  Selector based ("remove") POST script that removes a product asset.

  ==============================================================================


--%><%
%><%@include file="/libs/granite/ui/global.jsp" %><%
%><%@page session="false"
          import="org.apache.commons.lang.StringUtils,
                  com.adobe.cq.commerce.api.asset.ProductAssetManager" %><%

    String productAssetPath = (request.getParameter("productAssetPath") != null)? request.getParameter("productAssetPath") : null;
    if (StringUtils.isEmpty(productAssetPath))  {
        return;
    }
    ProductAssetManager productAssetManager = resourceResolver.adaptTo(ProductAssetManager.class);
    productAssetManager.removeAsset(productAssetPath);

%>