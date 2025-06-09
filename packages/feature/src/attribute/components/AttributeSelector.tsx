import { MultiSelect } from "@workspace/ui/components/multi-select"
import { ComponentProps, FC, useEffect, useMemo, useState } from "react"
import { useInView } from "react-intersection-observer"
import { useInfiniteQuery, useMutation } from "@tanstack/react-query"
import { createAttribute, getAttributes } from "../services/attributeService"
import { useDebouncedCallback } from "use-debounce"

type AttributeSelectorProps = Pick<ComponentProps<typeof MultiSelect>, "variant" | "className">
    
export const AttributeSelector: FC<AttributeSelectorProps> = (props) => {
    const { ref, inView } = useInView()

    const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);
    const [search, setSearch] = useState<string | undefined>('');
    const {
        data,
        refetch,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ['attributes', search],
        queryFn: async ({
            pageParam,
        }) => {
            const response = await getAttributes({
                limit: 10,
                next: pageParam !== '' ? pageParam : undefined,
                search: search || undefined,
            })
            return response
        },
        initialPageParam: '',
        getNextPageParam: (lastPage) => lastPage.next,
    })
    const options = useMemo(() => data?.pages.flatMap(page => page.data).map((attribute) => ({
        label: attribute.buildingAttribute,
        value: attribute.id,
    })) || [], [data])
    const { mutateAsync } = useMutation({
        mutationFn: createAttribute,
    })

    const debouncedSearch = useDebouncedCallback((value: string) => setSearch(value), 300);
    const handleSearch = (value: string) => debouncedSearch(value);
    const handleAdd = async (value: string) => {
        const res = await mutateAsync({
            buildingAttribute: value,
        })
        await refetch()
        setSelectedAttributes((prev) => [...prev, res.id])
    }

    useEffect(() => {
        if (inView) {
            fetchNextPage()
        }
    }, [fetchNextPage, inView])

    return (
        <MultiSelect 
            {...props} 
            onValueChange={setSelectedAttributes}
            value={selectedAttributes}
            options={options}
            isLocalSearch={false}
            onSearch={handleSearch}
            allowAdd={true}
            onAdd={handleAdd}
            placeholder="Select Building Attributes"
            afterOptionRender={hasNextPage && (
                <div ref={ref}>Loading...</div>
            )}
        />
    )
}