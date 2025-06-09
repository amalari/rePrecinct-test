import axios from "axios";
import { BASE_API_URL } from "../../consts";

type Attribute = {
    id: string;
    buildingAttribute: string;
}

type GetAttributesParams = {
    limit?: number;
    next?: string;
    search?: string;
}
type GetAttributesResponse = {
    data: Array<Attribute>;
    next: string | null;
}
export const getAttributes = async (params: GetAttributesParams) => {
    console.log({ params })
    const res = await axios.get<GetAttributesResponse>(`${BASE_API_URL}/attribute`, {
        params
    });

    return res.data;
}

type CreateAttributeInput = Pick<Attribute, "buildingAttribute">;
export const createAttribute = async (input: CreateAttributeInput) => {
    const res = await axios.post<{ data: Attribute }>(`${BASE_API_URL}/attribute`, input);
    return res.data.data;
}