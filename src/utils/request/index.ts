import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';
import { isBoolean, isNumber, isString } from 'lodash';

type IFRequestInstance = AxiosInstance;
type IFCancelTokenSource = CancelTokenSource;
export type IFResponse<T> = AxiosResponse<T>;
type IFRequestConfig = AxiosRequestConfig;

function isExactObject(data: any): boolean {
  return Object.prototype.toString.call(data) === '[object Object]';
}

class RequestClass {
  _axios: IFRequestInstance;
  isCancel: (error: Error) => boolean = axios.isCancel;
  public constructor(axiosInstance: IFRequestInstance) {
    this._axios = axiosInstance;
  }

  /**
   * 创建一个axios实例
   * @returns {RequestClass} axios实例
   */
  public static createInstance(): RequestClass {
    const newAxios = axios.create({});
    return new RequestClass(newAxios);
  }

  /**
   * 通用请求接口
   * @param {IFRequestConfig} config 配置项
   * @returns {Promise<IFResponse<any>>} response
   * @memberof RequestClass
   */
  public request(config: IFRequestConfig): Promise<IFResponse<any>> {
    return this._axios(config);
  }

  /**
   * 发送get请求
   * @param  {string} url    url地址
   * @param {?Object} query 查询
   * @param  {Partial<IFRequestConfig>} [options={}] axios额外选项
   * @return {Promise<IFResponse<any>>}        promise对象
   */
  public get<T>(
    url: string,
    query?: Record<string, any>,
    options: Partial<IFRequestConfig> = {},
  ): Promise<IFResponse<T>> {
    let realUrl = url;
    // 添加querystring
    if (query && isExactObject(query)) {
      const queryItems: any[] = [];
      Object.keys(query).forEach((v: string) => {
        const value = query[v];
        // 过滤value的类型
        if (isBoolean(value) || isString(value) || isNumber(value)) {
          const itemstring = `${encodeURIComponent(v)}=${encodeURIComponent(value)}`;
          queryItems.push(itemstring);
        }
      });

      if (queryItems.length > 0) {
        const querystring = queryItems.join('&');
        realUrl = `${realUrl}?${querystring}`;
      }
    }

    const promise: Promise<IFResponse<T>> = this._axios.get<T>(realUrl, {
      ...options,
    });

    return promise;
  }

  /**
   * 发送post请求
   * @param  {string} url        url地址
   * @param  {any} [data={}]    数据
   * @param  {Partial<IFRequestConfig>} [options={}] 额外选项
   * @return {Promise<IFResponse<any>>}              [description]
   */
  public post<T = any>(
    url: string,
    data: any = {},
    options: Partial<IFRequestConfig> = {},
  ): Promise<IFResponse<T>> {
    const realUrl = url;

    const promise: Promise<IFResponse<T>> = this._axios.post(realUrl, data, {
      ...options,
    });

    return promise;
  }

  /**
   * 发送put请求
   * @param  {string} url        [description]
   * @param  {any} data       [description]
   * @param  {IFRequestConfig} options    [description]
   * @return {Promise<IFResponse<any>>}            [description]
   */
  public put<T = any>(
    url: string,
    data: any = {},
    options: Partial<IFRequestConfig> = {},
  ): Promise<IFResponse<T>> {
    const realUrl = url;

    const promise: Promise<IFResponse<T>> = this._axios.put<T>(realUrl, data, {
      ...options,
    });

    return promise;
  }

  /**
   * 给request添加拦截器
   * @NOTE: 所添加的拦截器按照添加的顺序反向进行调用，底层也是会将这些返回值封装Promise，从而形成链式调用的形式
   * @param {Function} fullfil (Object) => Object, 接收一个配置，返回另一个配置
   * @param {Function} reject  [description]
   * @return {number}  handle， 用来用取消
   */
  public addRequestInterceptor(
    fullfil?: (value: IFRequestConfig) => IFRequestConfig | Promise<IFRequestConfig>,
    reject?: (err: any) => any,
  ): number {
    return this._axios.interceptors.request.use(fullfil, reject);
  }

  /**
   * 移除handle对应的request拦截器
   * @param  {number} handle 可通过addRequestInterceptor返回值获得
   * @return {void}        [description]
   */
  public removeRequestInterceptor(handle: number): void {
    this._axios.interceptors.request.eject(handle);
  }

  /**
   * 添加responese拦截器
   * @NOTE: 所添加的拦截器按照添加的顺序进行调用，底层也是会将这些返回值封装Promise，从而形成链式调用的形式
   * @param {[type]} fullfil [description]
   * @param {Promise<Error>} reject  [description]
   * @return {number} handle， 用来用取消
   */
  public addResponeseInterceptor(
    fullfil: (obj: IFResponse<any>) => IFResponse<any> | Promise<IFResponse<any>>,
    reject?: (err: any) => any,
  ): number {
    return this._axios.interceptors.response.use(fullfil, reject);
  }

  /**
   * 移除handle对应的responese拦截器
   * @param  {number} handle 可通过addResponeseInterceptor返回值获得
   * @return {void}         [description]
   */
  public removeResponeseInterceptor(handle: number): void {
    this._axios.interceptors.response.eject(handle);
  }

  /**
   * 获得可取消的handle,用于任何阶段的取消请求
   * @returns {IFCancelTokenSource} IFCancelTokenSource
   * @memberof RequestClass
   */
  // eslint-disable-next-line class-methods-use-this
  public getCancelSource(): IFCancelTokenSource {
    const { CancelToken } = axios;
    return CancelToken.source();
  }
}
const defaultAxios = axios.create({});
const IFRequest = new RequestClass(defaultAxios);

export { IFRequest, RequestClass };
