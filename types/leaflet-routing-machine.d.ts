import * as L from "leaflet";

declare module "leaflet" {
  namespace Routing {
    function control(options: any): any;
    function osrmv1(options?: any): any;

    // OSRM router options
    interface OSRMOptions {
      serviceUrl?: string;
      profile?: "car" | "bike" | "foot";
      timeout?: number;
      useHints?: bigint;
      step?: boolean;
      suppressDemoServerWarning?: boolean;
    }
    // Router interface
    interface Router {
      route(
        waypoints: L.LatLng[],
        callback: (err: any, routes: any[]) => void
      ): void;
      options: OSRMOptions;
    }
    // Line styling options
    interface LineStyle {
      color?: string;
      opacity?: number;
      weight?: number;
      dashArray?: string;
      lineCap?: CanvasLineCap;
      lineJoin?: CanvasLineJoin;
    }

    interface LineOptions {
      styles?: LineStyle[];
      extentToWayPoints?: boolean;
      missingRouteTolerance?: number;
    }

    interface ControlOptions {
      waypoints: L.LatLng[];
      lineOptions?: any;
      routeWhileDragging?: boolean;
      addWaypoints?: boolean;
      draggableWaypoints?: boolean;
      fitSelectedRoutes?: boolean;
      show?: boolean;
      router?: any;
    }

    class Control extends L.Control {
      constructor(options: ControlOptions);
      on(
        event: "routesfound" | "routingerror" | "routeSelector",
        fn: (...args: any[]) => void
      ): this;
    }
    function control(options: ControlOptions): Control;
  }
}
