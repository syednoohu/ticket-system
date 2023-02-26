const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    line: {
      type: Number,
      default: 0,
    },
    dateOfOrder: Date,
    orderType: {
      type: String,
      default: "",
    },
    orderId: {
      type: String,
      default: "",
    },
    // clientName = clientFullName
    // excel : 單位全名
    clientName: {
      type: String,
      default: "",
    },
    districtArea: {
      type: String,
      default: "",
    },
    agents: {
      type: [String],
      default: [],
    },
    orderSummarize: {
      type: String,
      default: "",
    },
    optionalField1: {
      type: String,
      default: "",
    },
    delieverArea: {
      type: String,
      default: "",
    },
    optionalField3: {
      type: String,
      default: "",
    },
    optionalField4: {
      type: String,
      default: "",
    },
    optionalField5: {
      type: String,
      default: "",
    },
    optionalField6: {
      type: String,
      default: "",
    },
    receiver: {
      type: String,
      default: "",
    },
    provinceArea: String,
    receiverAddress: {
      type: String,
      default: "",
    },
    delieverInfo: {
      type: String,
      default: "",
    },
    optionalField11: String,
    optionalField12: String,
    optionalField13: String,
    optionalField14: String,
    optionalField15: String,
    optionalField16: String,
    salesOrderNumber: String,
    freeField4: String,
    freeField5: String,
    freeField6: String,
    freeField7: String,
    freeField8: String,
    freeField9: String,
    freeField10: String,
    dateFreeField1: String,
    dateFreeField2: String,
    dateFreeField3: String,
    valueFreeField1: String,
    valueFreeField2: String,
    valueFreeField3: String,
    departmentName: {
      type: String,
      default: "",
    },
    //==========================
    stockList: [
      {
        isFree:{
          type: Boolean,
          default: false,
        },
        used: {
          type: Boolean,
          default: false,
        },
        forWhichOrderId:  {
          type: String,
          default: "",
        },
        leftOver: {
          leftOverQuantity: {
            type: Number,
            default: 0,
          },
          leftOverUsed: {
            type: Boolean,
            default: false,
          },
          orderId: {
            type: String,
            default: "",
          },
        },
        isProductDiscountApplied: {
          type: Boolean,
          default: false,
        },
        productDiscountFactor: Number,
        stockId: {
          type: String,
          default: "",
        },
        stockName: {
          type: String,
          default: "",
        },
        isSpecialProduct: {
          type: Boolean,
          default: false,
        },
        buyXgetN_freeQuantiy: {
          type: Number,
          default: 0,
        },
        typeOfUnit: String,
        pcToBox: {
          type: Number,
          default: 0,
        },
        quantity: Number,
        unitPrice: Number,
        subTotal: Number,
        isPaid: {
          type: Boolean,
          default: false,
        },
        isDelivered: {
          type: Boolean,
          default: false,
        },
        deliveryDetails: {
          deliverTime: Date,
          deliverDate: Date,
        },
        fivePercentCharge: {
          type: Number,
          default: 0,
        },
        // excel
        discountedUnitPrice: Number,
        excel_discount: {
          type: Number,
          default: 0,
        },
        //
        discountedSubtotal: Number,
        taxValue: String,
        priceIncludedTax: Number,
        subTotalIncludedTax: Number,
        batch: {
          type: String,
          default: "",
        },
        // 到期日期
        dateUntil: Date,
        // 辅1数量, 辅2数量
        reminder_quantity: String,
        reminder1_quantity: String,
        reminder2_quantity: String,
        reminder1_discountedUnitPrice: String,
        reminder2_discountedUnitPrice: String,
        taxRate: String,
        reminder1_taxIncludedUnitPrice: String,
        reminder2_taxIncludedUnitPrice: String,
        unitCost: Number,
        unitSubtotalCost: Number,
        grossProfit: Number,
        grossProfitPercent: Number,
        subUnitQuantity: String,
        lineSummary: {
          type: String,
          default: "",
        },
        tradeCode: String,
        gift: String,
        freeField1: {
          type: String,
          default: "",
        },
        freeField2: {
          type: String,
          default: "",
        },
        freeField3: {
          type: String,
          default: "",
        },
      },
    ],
    clientId: {
      type: String,
      default: "",
    },
    client_id: mongoose.Types.ObjectId,
    clientDiscountFactor: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      default: 0,
    },
    createdBy: String,
    updatedBy: String,
    updatedAt: {
      type: Date,
      default: () => Date.now(),
    },
    confirmation: {
      isTopLevelConfirmed: {
        type: Boolean,
        default: false,
      },
      isLevel2Confirmed: {
        type: Boolean,
        default: false,
      },
      isLevel3Confirmed: {
        type: Boolean,
        default: false,
      },
      isLevel4Confirmed: {
        type: Boolean,
        default: false,
      },
    },
    confirmedBy: {
      type: [String],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Orders", OrderSchema);
