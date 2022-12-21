import {
  ListConfig,
  BaseListTypeInfo,
  BaseFields,
} from "@keystone-6/core/types";
import { AtTrackingOptions, ByTrackingOptions } from "../types";
import { atTracking } from "./atTracking";
import { byTracking } from "./byTracking";

export const configureTracking =
  ({
    atTrackingOptions = {},
    byTrackingOptions = { ref: "User" },
  }: {
    atTrackingOptions?: AtTrackingOptions;
    byTrackingOptions?: ByTrackingOptions;
  }) =>
  <Fields extends BaseFields<BaseListTypeInfo>>(
    listConfig: ListConfig<BaseListTypeInfo, Fields>
  ): ListConfig<BaseListTypeInfo, Fields> => {
    return byTracking(byTrackingOptions)(
      atTracking(atTrackingOptions)(listConfig)
    );
  };

export type { AtTrackingOptions, ByTrackingOptions } from "../types";
