WITH limited_products AS (
    SELECT 
        id AS product_id,
        title AS product_title,
        version AS product_version,
        title_tsvector
    FROM product 
    LIMIT 5139
)
SELECT  
    lp.product_id,
    lp.product_title,
    lp.product_version,
    CASE 
        WHEN c.benchmarktitle IS NOT NULL OR s.benchmarktitle IS NOT NULL THEN 'Yes' 
        ELSE 'No' 
    END AS benchmark_available,
    c.benchmarktitle AS cis_benchmark,
    s.benchmarktitle AS stig_benchmark
FROM 
    limited_products lp
    LEFT JOIN cis_benchmarks c 
    ON lp.title_tsvector @@ to_tsquery('english', c.benchmarktitle)  -- Full-text search for CIS
    LEFT JOIN stig_benchmarks s 
    ON lp.title_tsvector @@ to_tsquery('english', s.benchmarktitle)  -- Full-text search for STIG
ORDER BY benchmark_available DESC;
