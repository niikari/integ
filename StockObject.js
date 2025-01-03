class StockObject {
    constructor(
      itemId,
      brand,
      tecdocArnrCode,
      tecdocBrandCode,
      warehouseCode,
      warehouseLocation,
      stock = null,
      providerReference
    ) {
      this.ITEM_ID = itemId;
      this.BRAND = brand;
      this.TECDOC_ARNR_CODE = tecdocArnrCode;
      this.TECDOC_BRAND_CODE = tecdocBrandCode;
      this.WAREHOUSE_CODE = warehouseCode;
      this.WAREHOUSE_LOCATION = warehouseLocation;
      this.STOCK = stock;
      this.PROVIDER_REFERENCE = providerReference;
    }
  }
  
  module.exports = StockObject;
  