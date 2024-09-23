type SortOrderType = 'ASC' | 'DESC';

declare interface FilterOptionsInterface {
  table: string;
  page?: number;
  limit?: number;
  sort?: string;
  sortOrder?: SortOrderType;
  fields?: string[];
  filters?: Record<string, any>;
}

export class ApiFeatuere {
  #_queryString: string | null = null;
  #_filterOptions: FilterOptionsInterface;

  constructor(tableName: string) {
    this.#_filterOptions = {
      table: tableName,
      page: 1,
      limit: 10,
      sort: 'id',
      sortOrder: 'ASC',
      fields: ['*'],
      filters: {},
    };
  }

  paginate(page: number = 1, limit: number = 10) {
    // console.log(this.#_filterOptions.limit, this.#_filterOptions.page, "*")
    this.#_filterOptions.limit = limit ? limit : this.#_filterOptions.limit;
    this.#_filterOptions.page = page ? page : this.#_filterOptions.page;
    
    return this;
  }

  filter() {}

  limitFields(selectedFields: string[]) {
    this.#_filterOptions.fields = selectedFields;

    return this;
  }

  sort(sortField: string, sortOrder: SortOrderType = 'ASC') {
    this.#_filterOptions.sort = sortField;
    this.#_filterOptions.sortOrder = sortOrder;

    return this;
  }

  getQuery(): {
    queryString: string;
    limit: number;
    page: number
  } {
    const selectedFields = this.#_filterOptions.fields.join(', ');
    const offset = (this.#_filterOptions.page - 1) * this.#_filterOptions.limit;

    let filterQuery: string = Object.entries(this.#_filterOptions.filters)
      .length
      ? ' WHERE '
      : '';
    const allFilters = Object.entries(this.#_filterOptions.filters).forEach(
      (fl, i, arr) => {
        if (i == arr.length - 1) {
          filterQuery += `${fl[0]} ${fl[1]} `;
        } else {
          filterQuery += `${fl[0]} ${fl[1]} AND `;
        }
      },
    );
    this.#_queryString = `SELECT ${selectedFields} FROM ${this.#_filterOptions.table} ${filterQuery} 
        ORDER BY ${this.#_filterOptions.sort} ${this.#_filterOptions.sortOrder}
        LIMIT ${this.#_filterOptions.limit}
        OFFSET ${offset};`;

    return {
      queryString: this.#_queryString,
      limit: this.#_filterOptions.limit,
      page: this.#_filterOptions.page,
    };
  }
}
