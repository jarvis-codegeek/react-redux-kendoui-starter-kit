WITH limited_items AS (
    SELECT 
        i.id AS item_id,
        i.name AS item_name,
        i.version AS item_version
    FROM items i
    LIMIT 4500
)
SELECT
    li.item_id,
    li.item_name,
    li.item_version,
    CASE 
        WHEN c.id IS NOT NULL OR s.id IS NOT NULL THEN 'Yes' 
        ELSE 'No' 
    END AS b_available
FROM 
    limited_items li
    LEFT JOIN c_benchmarks c 
    ON similarity(li.item_name, c.benchmarktitle) > 0.5
    LEFT JOIN s_benchmarks s 
    ON similarity(li.item_name, s.benchmarktitle) > 0.5
