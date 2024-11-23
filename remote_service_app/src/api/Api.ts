/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ActiveAppeal {
  /** Id */
  id: number;
  /** Count */
  count: number;
}

export interface Issue {
  /** Id */
  id?: number;
  /**
   * Name
   * @minLength 1
   * @maxLength 64
   */
  name: string;
  /**
   * Description
   * @minLength 1
   * @maxLength 300
   */
  description: string;
  /**
   * Image
   * @minLength 1
   */
  image?: string;
}

export interface AppealIssues {
  issue: Issue;
  /**
   * Count
   * @min 1
   * @max 2147483647
   */
  count: number;
}

export interface AppealIssuesAddResponse {
  active_appeal: ActiveAppeal;
  appeal_issues: AppealIssues[];
}

export interface AppealIssueEdit {
  /** Count */
  count: number;
}

export interface Appeal {
  /** Id */
  id?: number;
  /** Client */
  client?: string;
  /** Helper */
  helper?: string;
  /** Status id */
  status_id?: number;
  /**
   * Time created
   * @format date-time
   */
  time_created?: string;
  /**
   * Time applied
   * @format date-time
   */
  time_applied?: string;
  /**
   * Time ended
   * @format date-time
   */
  time_ended?: string;
  /**
   * Connection code
   * @minLength 1
   * @maxLength 64
   */
  connection_code: string;
  /** Average work time */
  average_work_time?: number;
  issues?: AppealIssues[];
}

export interface AppealEdit {
  /**
   * Connection code
   * @minLength 1
   */
  connection_code: string;
}

export interface AppealFinish {
  /** Apply */
  apply: boolean;
}

export interface IssuesResponse {
  /** Id */
  id: number;
  /**
   * Name
   * @minLength 1
   */
  name: string;
  /**
   * Description
   * @minLength 1
   */
  description: string;
  /**
   * Image
   * @minLength 1
   */
  image: string;
}

export interface IssueListResponse {
  active_appeal: ActiveAppeal;
  issues: IssuesResponse[];
  appeal_issues: AppealIssues[];
}

export interface IssueImage {
  /**
   * Image
   * @format uri
   */
  image?: string;
}

export interface User {
  /**
   * Error
   * @minLength 1
   */
  error?: string;
  /**
   * Username
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   */
  username?: string;
  /**
   * Email address
   * @format email
   * @minLength 1
   */
  email?: string;
  /**
   * First name
   * @maxLength 150
   */
  first_name?: string;
  /**
   * Last name
   * @maxLength 150
   */
  last_name?: string;
  /**
   * Staff status
   * Designates whether the user can log into this admin site.
   */
  is_staff?: boolean;
  /**
   * Superuser status
   * Designates that this user has all permissions without explicitly assigning them.
   */
  is_superuser?: boolean;
}

export interface UserLogin {
  /**
   * Username
   * @minLength 1
   */
  username: string;
  /**
   * Password
   * @minLength 1
   */
  password: string;
}

export interface UserRegister {
  /**
   * Username
   * @minLength 1
   */
  username: string;
  /**
   * Email
   * @minLength 1
   */
  email: string;
  /**
   * Password
   * @minLength 1
   */
  password: string;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://127.0.0.1:8000" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Snippets API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://127.0.0.1:8000
 * @contact <contact@snippets.local>
 *
 * Test description
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  appealIssues = {
    /**
     * No description
     *
     * @tags appeal_issues
     * @name AppealIssuesCreate
     * @request POST:/appeal_issues/{issue_id}/
     * @secure
     */
    appealIssuesCreate: (issueId: string, params: RequestParams = {}) =>
      this.request<AppealIssuesAddResponse, any>({
        path: `/appeal_issues/${issueId}/`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags appeal_issues
     * @name AppealIssuesUpdate
     * @request PUT:/appeal_issues/{issue_id}/
     * @secure
     */
    appealIssuesUpdate: (issueId: string, data: AppealIssueEdit, params: RequestParams = {}) =>
      this.request<AppealIssues, any>({
        path: `/appeal_issues/${issueId}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags appeal_issues
     * @name AppealIssuesDelete
     * @request DELETE:/appeal_issues/{issue_id}/
     * @secure
     */
    appealIssuesDelete: (issueId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/appeal_issues/${issueId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  appeals = {
    /**
     * No description
     *
     * @tags appeals
     * @name AppealsList
     * @request GET:/appeals/
     * @secure
     */
    appealsList: (params: RequestParams = {}) =>
      this.request<Appeal[], any>({
        path: `/appeals/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags appeals
     * @name AppealsRead
     * @request GET:/appeals/{appeal_id}/
     * @secure
     */
    appealsRead: (appealId: string, params: RequestParams = {}) =>
      this.request<Appeal, any>({
        path: `/appeals/${appealId}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags appeals
     * @name AppealsUpdate
     * @request PUT:/appeals/{appeal_id}/
     * @secure
     */
    appealsUpdate: (appealId: string, data: AppealEdit, params: RequestParams = {}) =>
      this.request<AppealEdit, any>({
        path: `/appeals/${appealId}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags appeals
     * @name AppealsDelete
     * @request DELETE:/appeals/{appeal_id}/
     * @secure
     */
    appealsDelete: (appealId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/appeals/${appealId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags appeals
     * @name AppealsConfirmUpdate
     * @request PUT:/appeals/{appeal_id}/confirm
     * @secure
     */
    appealsConfirmUpdate: (appealId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/appeals/${appealId}/confirm`,
        method: "PUT",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags appeals
     * @name AppealsFinishUpdate
     * @request PUT:/appeals/{appeal_id}/finish
     * @secure
     */
    appealsFinishUpdate: (appealId: string, data: AppealFinish, params: RequestParams = {}) =>
      this.request<AppealFinish, any>({
        path: `/appeals/${appealId}/finish`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  issues = {
    /**
     * No description
     *
     * @tags issues
     * @name IssuesList
     * @request GET:/issues/
     * @secure
     */
    issuesList: (
      query: {
        /** @minLength 1 */
        issue_name: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<IssueListResponse, any>({
        path: `/issues/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags issues
     * @name IssuesCreate
     * @request POST:/issues/
     * @secure
     */
    issuesCreate: (data: Issue, params: RequestParams = {}) =>
      this.request<Issue, any>({
        path: `/issues/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags issues
     * @name IssuesRead
     * @request GET:/issues/{issue_id}/
     * @secure
     */
    issuesRead: (issueId: string, params: RequestParams = {}) =>
      this.request<Issue, any>({
        path: `/issues/${issueId}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags issues
     * @name IssuesUpdate
     * @request PUT:/issues/{issue_id}/
     * @secure
     */
    issuesUpdate: (issueId: string, data: Issue, params: RequestParams = {}) =>
      this.request<Issue, any>({
        path: `/issues/${issueId}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags issues
     * @name IssuesDelete
     * @request DELETE:/issues/{issue_id}/
     * @secure
     */
    issuesDelete: (issueId: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/issues/${issueId}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags issues
     * @name IssuesImageCreate
     * @request POST:/issues/{issue_id}/image
     * @secure
     */
    issuesImageCreate: (issueId: string, data: IssueImage, params: RequestParams = {}) =>
      this.request<IssueImage, any>({
        path: `/issues/${issueId}/image`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags user
     * @name UserUpdate
     * @request PUT:/user/
     * @secure
     */
    userUpdate: (data: User, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserLoginCreate
     * @request POST:/user/login
     * @secure
     */
    userLoginCreate: (data: UserLogin, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/user/login`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserLogoutCreate
     * @request POST:/user/logout
     * @secure
     */
    userLogoutCreate: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user/logout`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserRegisterCreate
     * @request POST:/user/register
     * @secure
     */
    userRegisterCreate: (data: UserRegister, params: RequestParams = {}) =>
      this.request<UserRegister, any>({
        path: `/user/register`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
