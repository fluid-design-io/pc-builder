import { list } from "@keystone-6/core";
import { json, relationship, text } from "@keystone-6/core/fields";
import { permissions } from "./access";

export const Address = list({
  access: permissions.readOnly,
  ui: {
    isHidden: (context) => !permissions.canManageUsers(context),
    labelField: "street",
  },
  fields: {
    user: relationship({
      ref: "User.address",
    }),
    street: text(),
    city: text(),
    state: text({
      defaultValue: "CA",
      validation: {
        length: {
          min: 2,
          max: 2,
        },
      },
    }),
    zip: text(),
    country: text({
      defaultValue: "United States",
    }),
    geolocation: json({
      ui: {
        createView: { fieldMode: "hidden" },
        itemView: { fieldMode: "read" },
        description: "This is automatically generated from the address above.",
      },
    }),
  },
  hooks: {
    resolveInput: async ({ resolvedData }) => {
      const parsedAddressUrl = encodeURIComponent(
        `${resolvedData.street}, ${resolvedData.city}, ${resolvedData.state}, ${resolvedData.zip}`
      );
      const api = `https://api.mapbox.com/geocoding/v5/mapbox.places/${parsedAddressUrl}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`;
      try {
        const res = await fetch(api);
        const data = await res.json();
        resolvedData.geolocation = JSON.stringify(data.features[0].geometry);
      } catch (err) {
        console.log(err);
      }
      return resolvedData;
    },
  },
});
