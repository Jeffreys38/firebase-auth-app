/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(app)` | `/(app)/` | `/(app)/(drawer)` | `/(app)/(drawer)/` | `/(app)/(drawer)/import_user` | `/(app)/(drawer)/settings` | `/(app)/get-started` | `/(app)/import_user` | `/(app)/settings` | `/(drawer)` | `/(drawer)/` | `/(drawer)/import_user` | `/(drawer)/settings` | `/_sitemap` | `/forgot` | `/get-started` | `/import_user` | `/login` | `/settings` | `/signup`;
      DynamicRoutes: never;
      DynamicRouteTemplate: never;
    }
  }
}
