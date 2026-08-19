migrate((app) => {
    const collection = app.findCollectionByNameOrId("users");

    const field = collection.fields.getByName("name");

    field.name = "username";
    field.required = true;

    app.save(collection);
}, (app) => {
    const collection = app.findCollectionByNameOrId("users");

    const field = collection.fields.getByName("username");

    field.name = "name";
    field.required = false;

    app.save(collection);
});
