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

  paginate(page: number, limit: number) {
    // console.log(this.#_filterOptions.limit, this.#_filterOptions.page, "*")
    // this.#_filterOptions.limit = limit ? limit : this.#_filterOptions.limit;
    // this.#_filterOptions.page = page ? page : this.#_filterOptions.page;

    this.#_filterOptions.limit = limit
    this.#_filterOptions.page = page
    
    return this;
  }

  filter(queries: Record<string, any>) {
    const allQuery = {...queries}
    const excludedFields = ["limit", "page", "sort", "fields"]

    excludedFields.forEach((exf) => {
      delete allQuery[exf]
    })

    console.log(allQuery)

    this.#_filterOptions.filters = {
      name: "= 'O'tkan kunlar",
      rating: 'BETWEEN 3 AND 5',
      year: "< 2000"
    }

    // {name: "Oq kema", rating: "3~5", year: "< 2000" } => `WHERE name = "Oq kema" AND rating BETWEEN 3 AND 5 AND year < 2000`

    return this;
  }

  limitFields(selectedFields: string[]) {
    this.#_filterOptions.fields = selectedFields;

    return this;
  }

  sort(sortField: string = this.#_filterOptions.sort) {
    let sortOrder: SortOrderType = 'ASC'

    if(sortField.at(0) == '-'){
      sortField = sortField.slice(1, sortField.length)
      sortOrder = "DESC"
    }

    // console.log(sortField, sortOrder)
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
