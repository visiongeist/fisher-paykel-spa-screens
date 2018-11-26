<%--
  ADOBE CONFIDENTIAL

  Copyright 2016 Adobe Systems Incorporated
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
                  org.apache.sling.api.wrappers.ValueMapDecorator,
                  com.adobe.granite.ui.components.Config,
                  com.adobe.granite.ui.components.Field" %><%

    Config cfg = cmp.getConfig();

    String name = cmp.getExpressionHelper().getString(cfg.get("name", String.class));
    Object value;
    if (cfg.get("multiple", false)) {
        value = cmp.getValue().getContentValue(name, new String[0]);
    } else {
        value = cmp.getValue().val(name, cmp.getExpressionHelper().getString(cfg.get("value", "")));
    }

    ValueMap vm = new ValueMapDecorator(new HashMap<String, Object>());
    vm.put("value", value);
    vm.put("name", name);

    request.setAttribute(Field.class.getName(), vm);
%>