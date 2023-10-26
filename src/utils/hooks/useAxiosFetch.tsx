import { AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { CustomHttpRequestStatus } from "../constants";
import { ErrorResponseData } from "../libs/axios-client";
interface useAxiosFetchProps {
  fetcher: (values?: any) => Promise<AxiosResponse>;
  onSuccess?: (response?: AxiosResponse<any, any>) => void;
  onError?: (response?: AxiosResponse<any, any> | ErrorResponseData) => void;
  fetchOnce?: boolean;
}

interface RefData {
  mode: CustomHttpRequestStatus;
}
const useAxiosFetch = (props: useAxiosFetchProps) => {
  const [request, setRequest] = useState<RefData | null>(null);
  const [responseData, setResponseData] = useState<any>(null);
  const onRequestChange = (mode: CustomHttpRequestStatus) => {
    setRequest({ mode });
  };

  const onFetch = useCallback(async (values?: any) => {
    onRequestChange(CustomHttpRequestStatus.PENDING);
    try {
      const response = await props.fetcher(values);
      props?.onSuccess && props.onSuccess(response);
      setResponseData(response.data);
      onRequestChange(CustomHttpRequestStatus.FULFILLED);
    } catch (error: any) {
      props.onError && props.onError(error);
      onRequestChange(CustomHttpRequestStatus.REJECTED);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props.fetchOnce) {
      onFetch();
    }
  }, [onFetch, props.fetchOnce]);

  return {
    onFetch,
    status: request?.mode,
    responseData,
    success: request?.mode === CustomHttpRequestStatus.FULFILLED,
    loading: request?.mode === CustomHttpRequestStatus.PENDING,
  };
};

export default useAxiosFetch;
