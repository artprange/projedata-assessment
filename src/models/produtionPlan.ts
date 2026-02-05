type ProductionPlanItem = {
	productId: string;
	productCode: string;
	productName: string;
	unitPrice: number;
	suggestedQuantity: number;
	totalValue: number;
};

type ProductionPlanResponse = {
	items: ProductionPlanItem[];
	grandTotalValue: number;
	remainingStock: Record<string, number>;
};

export type { ProductionPlanItem, ProductionPlanResponse };
