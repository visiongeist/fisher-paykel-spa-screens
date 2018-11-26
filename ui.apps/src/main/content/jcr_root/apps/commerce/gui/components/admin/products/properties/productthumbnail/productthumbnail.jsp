<%--
  ADOBE CONFIDENTIAL

  Copyright 2013 Adobe Systems Incorporated
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
          import="java.util.Arrays,
                  javax.jcr.Node,
                  org.apache.commons.lang.StringUtils,
                  org.apache.sling.api.resource.Resource,
                  org.apache.sling.api.resource.ValueMap,
                  com.adobe.granite.ui.components.AttrBuilder,
                  com.adobe.granite.ui.components.Config,
                  com.adobe.granite.ui.components.Tag,
                  com.day.cq.commons.jcr.JcrConstants,
                  com.day.cq.wcm.api.PageManager,
                  com.adobe.cq.commerce.api.Product,
                  com.adobe.cq.commerce.api.asset.ProductAssetManager,
                  com.adobe.cq.commerce.common.CommerceHelper" %><%--

Config options:
    - readonly - if true, ommits the rendering of editing components for the tumbnail, defaults to false

--%><%

    String productPath = "";
    String productAssetThumbnailUrl = request.getContextPath() + "/libs/commerce/gui/components/admin/resources/thumbnail.png";

    Config cfg = cmp.getConfig();

    Resource itemRes = resourceResolver.getResource(slingRequest.getRequestPathInfo().getSuffix());
    if (itemRes == null) {
        itemRes = resourceResolver.getResource(request.getParameter("item"));
    }
    Product product = (itemRes != null)? itemRes.adaptTo(Product.class): null;

    String[] selectors = slingRequest.getRequestPathInfo().getSelectors();
    boolean newProductAsset = Arrays.asList(selectors).contains("new");

    if (product != null) {
        // the product exists
        productPath = product.getPath();
        PageManager pageManager = resourceResolver.adaptTo(PageManager.class);

        if (!newProductAsset) {
            // the product asset exists

            String imagePath = null;
            if (request.getParameter("imagePath") != null) {
                imagePath = request.getParameter("imagePath");
            }
            if (imagePath == null) {
                imagePath = (String) request.getAttribute("cq-product-image-path");
            }

            boolean isAbsoluteImageUrl = imagePath != null && (imagePath.startsWith("http://") || imagePath.startsWith("https://"));
            if (isAbsoluteImageUrl) {
                productAssetThumbnailUrl = imagePath;
            } else {
                if (imagePath != null) {
                    ProductAssetManager productAssetManager = resourceResolver.adaptTo(ProductAssetManager.class);
                    productAssetThumbnailUrl = productAssetManager.getThumbnailUrl(imagePath, "319.319");
                    if (StringUtils.isEmpty(productAssetThumbnailUrl)) {
                        return;
                    }
    
                    // add the context path
                    productAssetThumbnailUrl = request.getContextPath() + productAssetThumbnailUrl;
                } else {
                    productAssetThumbnailUrl  = CommerceHelper.getProductCardThumbnail(request.getContextPath(), product);
                    if (StringUtils.isEmpty(productAssetThumbnailUrl)) {
                        return;
                    }
                }
                // add the cache killer
                Resource productAssetRes = resourceResolver.resolve(imagePath);
                ValueMap productAssetProps = productAssetRes.adaptTo(ValueMap.class);
                long ck = productAssetProps.get(JcrConstants.JCR_LASTMODIFIED, (long) 0);
    
                productAssetThumbnailUrl = productAssetThumbnailUrl + "?cq_ck=" + ck;
            }
        }
    }

    Tag tag = cmp.consumeTag();
    AttrBuilder attrs = tag.getAttrs();
    attrs.addClass("cq-wcm-pagethumbnail");
    attrs.add("data-cq-wcm-pagethumbnail-path", productPath);

    AttrBuilder imageAttrs = new AttrBuilder(request, xssAPI);
    imageAttrs.addClass(cfg.get("class", String.class));
    imageAttrs.add("src", xssAPI.getValidHref(productAssetThumbnailUrl));
    imageAttrs.add("alt", i18n.get("Product thumbnail"));

    boolean readOnly = cfg.get("readonly", Boolean.FALSE);
    boolean isVirtual = itemRes != null && itemRes.adaptTo(Node.class) == null; // edit is disabled for a virtual resource

%><div <%= attrs.build() %>>
    <div class="foundation-layout-thumbnail coral-Form-field">
        <div class="foundation-layout-thumbnail-image grid">
            <coral-card colorhint="#ffffff">
                <coral-card-asset>
                    <img <%= imageAttrs.build() %>/>
                </coral-card-asset>
            </coral-card>
        </div>
    </div>
<%  if (!readOnly && !isVirtual) {%>
    <sling:include path="<%= xssAPI.getValidHref(resource.getPath()) + "/assetcategory" %>" />
    <sling:include path="<%= xssAPI.getValidHref(resource.getPath()) + "/assetpicker" %>" />

	<sling:include path="<%= xssAPI.getValidHref(resource.getPath()) + "/featureTitle" %>" />
	<sling:include path="<%= xssAPI.getValidHref(resource.getPath()) + "/featureDescription" %>" />
    <div class="thumbnail-buttons">
        <div class="thumbnail-button">
            <div class="foundation-field-editable foundation-layout-util-vmargin">
                <div class="foundation-field-edit">
                    <sling:include path="<%= xssAPI.getValidHref(resource.getPath()) + "/remove" %>" />
                </div>
            </div>
        </div>
    </div>
    <div class="foundation-field-editable foundation-layout-util-vmargin">
        <div class="foundation-field-edit product-image-separator"></div>
    </div>
<%  } %>
</div>