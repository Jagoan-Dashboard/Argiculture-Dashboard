export class ENDPOINTS {
  static LOGIN = "/api/v1/auth/login";
  // static LOGOUT = "/api/v1/auth/logout";
  static REFRESH_TOKEN = "/api/v1/auth/refresh";
  static ME = "/api/v1/auth/me";

  static EQUIPMENT_STATS = "/api/v1/agriculture/equipment/stats";
  static LAND_IRRIGATION_STATS = "/api/v1/agriculture/land-irrigation/stats";
  static PLANTATION_STATS = "/api/v1/agriculture/plantation/stats";
  static HORTICULTURE_STATS = "/api/v1/agriculture/horticulture/stats";
  static FOOD_CROP_STATS = "/api/v1/agriculture/food-crop/stats";
  static COMMODITY_ANALYSIS = "/api/v1/agriculture/commodity/analysis";
  static EXECUTIVE_DASHBOARD = "/api/v1/agriculture/executive/dashboard";
  static IMPORT_KOMODITAS = "/api/v1/agriculture/import/komoditas";
  static IMPORT_ALAT_PERTANIAN = "/api/v1/agriculture/import/alat-pertanian";
  static IMPORT_LAHAN_PENGAIRAN = "/api/v1/rice-fields/import/lahan-pengairan";
  static LAPORAN = "/api/v1/agriculture?limit=100";
}
