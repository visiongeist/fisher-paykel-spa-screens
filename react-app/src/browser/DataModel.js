ceddl.modelFactory.create({
    key: 'page',
    root: true,
    fields: {
        title: {
            type: ceddl.modelFactory.fields.StringField,
            required: true
        },
        name: {
            type: ceddl.modelFactory.fields.StringField,
            required: true
        },
        section: {
            type: ceddl.modelFactory.fields.StringField,
            required: false
        },
        site: {
            type: ceddl.modelFactory.fields.StringField,
            required: false
        }
    }
});

ceddl.modelFactory.create({
    key: 'product',
    root: false,
    fields: {
        category: {
            type: ceddl.modelFactory.fields.StringField,
            required: true,
        },
        sku: {
            type: ceddl.modelFactory.fields.StringField,
            required: true,
        },
        name: {
            type: ceddl.modelFactory.fields.StringField,
            required: true,
        }
    }
});

ceddl.initialize();

ceddl.eventbus.on('page', function(pageData) {
    console.log('CEDDL Data: ' + pageData);
    digitalData.pageInstanceID = pageData.name;
    digitalData.page = pageData;
});