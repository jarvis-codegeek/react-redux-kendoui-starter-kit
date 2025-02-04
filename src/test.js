SELECT 
    i.id AS item_id,
    i.name AS item_name,
    i.version AS item_version,

    CASE 
        WHEN c.id IS NOT NULL OR s.id IS NOT NULL THEN 'Yes' 
        ELSE 'No' 
    END AS b_available

FROM 
    items i  -- Ensure we check only 5139 items

LEFT JOIN 
    ci_benchmarks c 
ON 
    similarity(i.name, c.title) > 0.5

LEFT JOIN 
    st_benchmarks s 
ON 
    similarity(i.name, s.title) > 0.5
