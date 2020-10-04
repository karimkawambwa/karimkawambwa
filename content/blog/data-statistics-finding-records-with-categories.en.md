---
slug: "/blog/data-stats-finding-records-with-categories"
langKey: "en"
date: "2020-10-04"
title: "Data Stats: Finding Records with Categories"
excerpt: "Recently, I had a request to create a view that displayed website categories and how many websites fall under that category."
---

Okay, the task seemed simple enough and looking at the postgres data, the data table has the relevant columns `url` and `categories`. However what makes it tricky is that the column `categories` is a comma separated list of categories for that website. A simple `SELECT`, `COUNT` and `GROUP BY` query would not work. I would need to:

- Create a list of the catgories
- Count the websites for each distinct category

### Create a list of categories

The categories list is create with the folowing query:

```sql
SELECT
    UNNSET(
        STRING_TO_ARRAY(
            STRING_AGG(categories, ','),
            ','
            )
        ) AS category
FROM
    table_name
WHERE
    categories IS NOT NULL AND
    categories != ''
;
```

First all `categories` are joined/aggregated using the postgres string aggregation function `STRING_AGG(..)`. This results in an aggregated comma separated link where I `STRING_TO_ARRAY(...)` converts it into a json object. The last step, `UNNSET(...)` is something I have not used before. What this does is expand the array into rows. The rows are **not** DISTINCT, they have duplicate values since categerioes can exist in multiple website rows.

### Count the websites for each distinct category

Counting is simple now, since we have a non distict list, we can now use `COUNT` and `GROUP BY` as follows:

```sql
SELECT
    category,
    COUNT(u) AS websites_count
FROM (
    #Created List Query
) AS categories GROUP BY category;
```

## The Final Query

```sql
SELECT
    category,
    COUNT(u) AS websites_count
FROM (
    SELECT
        UNNSET(
            STRING_TO_ARRAY(
                STRING_AGG(categories, ','),
                ','
                )
            ) AS category
    FROM
        table_name
    WHERE
        categories IS NOT NULL AND
        categories != ''
) AS categories GROUP BY category
```

Am glad I got to use more of postgres, I remember practicing postgres using [PostgreSQL Exercises](https://pgexercises.com/) and will eventually keep getting knowlegeable to solve the problems even faster. I recommend practicing using those exercises. I used postgres in Code For Africa such as generating a sql statements from data csv files and using grapqhl to query the data ([see here](https://github.com/CodeForAfrica/HURUmap-Data)).
