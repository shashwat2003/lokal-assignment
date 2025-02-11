import axios from "axios";
import { axiosClient } from "./client";
import { URLs } from "./constants";

export const fetchJobs = async ({ pageParam }: { pageParam: number }) => {
  try {
    const { data, status } = await axiosClient.get<{ results: JobPosting[] }>(
      URLs.common.jobs,
      {
        params: {
          page: pageParam,
        },
      }
    );

    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (status === 200) {
      return data.results;
    }
  } catch (err) {
    if (!axios.isAxiosError(err)) {
      throw Error("Unknown Request Error has occured!");
    }
    throw Error(err.response?.data);
  }
  return [];
};
