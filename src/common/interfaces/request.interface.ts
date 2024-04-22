export interface IPaginatedRequestQuery {
  page: number
  perPage: number
}

export interface IGetProductsQuery extends IPaginatedRequestQuery {
  ordering?: string
  category?: string
}

export interface IGetOrdersQuery extends IPaginatedRequestQuery {
  ordering?: string
  createdAtGte?: string
  createdAtLte?: string
}
