const STATUS_PUBLIC = 1;

const api = (axios) => ({
  /**API : COMMON */
  getPageInfo: (name) => {
    return axios.get('api/page-info/find-by-name', { params: { name } });
  },
  getCategoryList: () => {
    return axios.get('api/blog-category/get-all')
      .then((data) => (data.content.filter((cate) => (cate.status === STATUS_PUBLIC))));
  },
  getCategory: (id) => {
    return axios.get('api/blog-category/' + id);
  },
  getSetting: (name) => {
    return axios.get(`api/setting/get-by-name`, { params: { name } })
      .then(({ value }) => (value ? value : {}));
  },
  getProvince: (id) => {
    return axios.get(`api/province/get-by-id/${id}`);
  },
  getProvinceList: () => {
    return axios.get(`api/province/get-all`);
  },

  /**API : BLOG */
  getBlogList: (params) => {
    return axios.get('api/blog/get-public', { params });
  },
  getTopViewBlog: (params) => {
    return axios.get('api/blog/get-top-view', { params });
  },
  getPost: (id) => {
    return axios.get(`api/blog/${id}`);
  },
  searchBlog: (params) => {
    return axios.get('api/blog/search-with-cate-and-province', { params });
  },
  getRelativeBlog: (params) => {
    return axios.get('api/blog/get-by-cate-and-province', { params });
  },
  /**API : HOMEPAGE */
  getTopPlaces: (limit = 5) => {
    return axios.get('api/place/get-all', { params: { limit } });
  },
  getTopSaleOff: (page = 1, size = 10) => {
    return axios.get('api/hotel/get-top-by-sale-off', { params: { page, size } });
  },
  getTopViewCount: (page = 1, size = 10) => {
    return axios.get('api/hotel/get-top-by-view-count', { params: { page, size } });
  },
  /**API : HOTEL */
  getHotelById: (id) => {
    return axios.get('api/hotel/get-by-id/' + id);
  },
  getHotelListByNameFTS: (params) => {
    return axios.get('api/hotel/get-list-by-name-FTS', { params });
  },
  getHotelListByStarRank: (params) => {
    return axios.get('api/hotel/get-list-by-star-rank', { params });
  },
  getHotelListToBooking: (params) => {
    return axios.get('api/hotel/get-all', { params });
  },
  getStatisticsByPlaceId: (params) => {
    return axios.get('api/hotel/get-statistics-by-place-id', { params: { page, size } });
  },
  getTopBySaleOff: (params) => {
    return axios.get('api/hotel/get-top-by-view-count', { params: { page, size } });
  },
  getTopByViewCount: (params) => {
    return axios.get('api/hotel/get-top-by-view-count', { params: { page, size } });
  }
})


export default api;