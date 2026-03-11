export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Concept {
  title: string;
  body: string;
  formula?: string;
  tip?: string;
}

export interface WorkedStep {
  step: number;
  instruction: string;
  formula?: string;
  result?: string;
}

export interface Module {
  id: number;
  slug: string;
  title: string;
  tagline: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedMinutes: number;
  icon: string;
  concepts: Concept[];
  workedExample: {
    title: string;
    scenario: string;
    steps: WorkedStep[];
  };
  quiz: QuizQuestion[];
}

export const modules: Module[] = [
  {
    id: 1,
    slug: 'excel-foundations',
    title: 'Excel Foundations',
    tagline: 'Master the building blocks every Excel user needs',
    level: 'Beginner',
    estimatedMinutes: 5,
    icon: '📊',
    concepts: [
      {
        title: 'The Excel Interface',
        body: 'The Ribbon runs across the top and contains tabs like Home, Insert, Formulas, Data, and View. Each tab groups related commands.\n\nThe Name Box (top-left, shows "A1") displays the address of the currently selected cell. You can also type a cell address here and press Enter to navigate directly to it.\n\nThe Formula Bar sits next to the Name Box and shows — or lets you edit — the content or formula inside the active cell.\n\nSheet tabs at the bottom let you switch between worksheets in the same workbook.\n\nColumns run vertically and are labeled A through Z, then AA through AZ, then BA through BZ, and so on. Rows run horizontally and are numbered 1 through 1,048,576.',
        tip: 'Press Ctrl+Home (Windows) / Cmd+Home (Mac) to jump to cell A1. Press Ctrl+End (Windows) / Cmd+End (Mac) to jump to the last used cell in your worksheet — great for quickly seeing how large your data is.',
      },
      {
        title: 'Cell References',
        body: 'Every cell has a unique address made up of its column letter and row number. For example, B3 refers to the cell at column B, row 3.\n\nTo select a cell, simply click it. The Name Box will show its address, and the Formula Bar will show its content.\n\nNavigating with the keyboard:\n• Arrow keys move one cell at a time\n• Ctrl+Arrow (Windows) / Cmd+Arrow (Mac) jumps to the last non-empty cell in that direction\n• Ctrl+End (Windows) / Cmd+End (Mac) jumps to the last used cell in the sheet\n• Ctrl+Home (Windows) / Cmd+Home (Mac) returns to A1\n\nYou can select a range by clicking and dragging, or by holding Shift while pressing arrow keys. A range is written as TopLeft:BottomRight — for example, B2:D10.',
        tip: 'To select an entire column, click the column letter header. To select an entire row, click the row number. Ctrl+A (Windows) / Cmd+A (Mac) selects the entire sheet.',
      },
      {
        title: 'Relative vs Absolute References',
        body: 'This concept is critical for writing formulas you can copy without errors.\n\nRelative reference (A1): When you copy a formula containing A1, Excel adjusts the reference automatically based on how far you moved. Copy =A1+B1 one row down, and it becomes =A2+B2.\n\nAbsolute reference ($A$1): The dollar signs lock the reference. No matter where you copy the formula, $A$1 always points to cell A1. Use this for constants like tax rates, exchange rates, or target values stored in a single cell.\n\nMixed references:\n• $A1 — column A is locked, row adjusts\n• A$1 — row 1 is locked, column adjusts\n\nPress F4 (Windows) / Fn+F4 (Mac) while your cursor is inside a cell reference in the formula bar to cycle through all four reference types: A1 → $A$1 → A$1 → $A1.',
        formula: '=B5*$B$7',
        tip: 'A common mistake: copying a formula that references a tax rate cell, only to find every row points to a different cell. Always use $ when referencing a fixed input cell.',
      },
      {
        title: 'Basic Arithmetic Formulas',
        body: 'All Excel formulas begin with an equals sign (=). Without it, Excel treats your entry as text.\n\nArithmetic operators:\n• + addition\n• - subtraction\n• * multiplication\n• / division\n• ^ exponentiation (power)\n\nExcel follows standard order of operations (PEMDAS/BODMAS): parentheses first, then exponents, then multiplication and division left to right, then addition and subtraction left to right.\n\nExamples:\n• =5+3*2 → 11 (multiplication before addition)\n• =(5+3)*2 → 16 (parentheses evaluated first)\n• =2^10 → 1024 (2 to the power of 10)\n• =100/4+5 → 30 (division before addition)',
        formula: '=(5+3)*2',
        tip: 'When in doubt, add parentheses. They make your intent explicit and prevent order-of-operations surprises. There is no penalty for extra parentheses.',
      },
    ],
    workedExample: {
      title: 'Getting Oriented in the Donor Database',
      scenario:
        "You've just opened sample.csv in Excel. It's a nonprofit donor transaction file with 23 columns — AccountNumber, Amount, Date, Method, FullName, Type, Primary.State, and more. Before any analysis, you need to understand the structure and build a quick giving summary using basic formulas.",
      steps: [
        {
          step: 1,
          instruction:
            "Press Ctrl+End (Windows) / Cmd+End (Mac) to find the last used cell. Excel jumps to the bottom-right corner of your data — note the row number (your record count) and column W (Pop.SqMile.2017, the rightmost column). This tells you the dataset's full size at a glance.",
          result: 'Last used cell revealed — you now know exactly how many donor records are in the file',
        },
        {
          step: 2,
          instruction:
            "Click the Name Box (top-left, currently showing a cell address). Type C1 and press Enter. Excel jumps directly to the Amount column header. This is faster than scrolling when you know the column.",
          result: 'Cell C1 selected — you can see "Amount" in the formula bar',
        },
        {
          step: 3,
          instruction:
            "With C1 selected, press Ctrl+Down (Windows) / Cmd+Down (Mac). Excel jumps to the last non-empty cell in column C — the final donation amount in the file.",
          result: 'Last Amount value highlighted — confirms the column has no unexpected gaps',
        },
        {
          step: 4,
          instruction:
            "Navigate to an empty area (e.g., cell Y1). Type 'Total Donations' as a label in X1. In Y1, calculate the total of all donations. Use the entire column to future-proof the formula.",
          formula: '=SUM(C:C)',
          result: 'Total donated across all records — note: SUM ignores the text header in C1 automatically',
        },
        {
          step: 5,
          instruction:
            "In X2 type '% of Total'. In Y2, write a formula calculating row 2's donation as a share of the total in Y1. Lock Y1 with an absolute reference so the formula stays correct when copied down to other rows.",
          formula: '=C2/$Y$1',
          result: "Row 2 donation shown as a decimal (e.g., 0.00001 for a $1 gift). The $Y$1 ensures every row divides by the same total — not a shifting cell.",
        },
      ],
    },
    quiz: [
      {
        id: 'q1-1',
        question:
          'In the donor file, you put the total Amount in cell Y1 using =SUM(C:C). In Z2 you write =C2/Y1 to find each donation\'s share of total giving. When you copy Z2 down to Z3, the formula becomes =C3/Y2 — but Y2 is empty! How do you fix the original formula in Z2?',
        options: ['=C2/Y1 is already correct', '=C2/$Y$1', '=$C$2/$Y$1', '=C2/SUM(C2:C2)'],
        correctIndex: 1,
        explanation:
          'Y1 must be locked with $Y$1 so it never shifts when the formula is copied down. C2 should remain relative so it adjusts to C3, C4, etc. per row.',
      },
      {
        id: 'q1-2',
        question:
          'You\'re in the Amount column (column C) of the donor file and want to jump to the very last donation entry without scrolling. Which keyboard shortcut is fastest?',
        options: [
          'Ctrl+Home (Win) / Cmd+Home (Mac) — jumps to A1',
          'Ctrl+Down (Win) / Cmd+Down (Mac) — jumps to the last non-empty cell in column C',
          'Ctrl+End (Win) / Cmd+End (Mac) — jumps to the last used cell in the sheet',
          'Alt+Page Down (Win) / Option+Page Down (Mac) — scrolls one screen right',
        ],
        correctIndex: 1,
        explanation:
          'Ctrl+Down (Windows) / Cmd+Down (Mac), when pressed from inside column C, jumps to the last non-empty cell in that column — landing exactly on the final donation amount. Ctrl+End (Windows) / Cmd+End (Mac) works too but lands on column W (the rightmost used column), not column C specifically.',
      },
      {
        id: 'q1-3',
        question:
          "A donor gave $5,000 (like Bill McMorrow in the file). You write =C2*0.1+25 to calculate a processing fee: 10% of the gift plus a $25 flat charge. With C2 = 5000, what does Excel return?",
        options: ['$5,025', '$525', '$502.50', '$550'],
        correctIndex: 1,
        explanation:
          'Excel follows order of operations: multiplication before addition. So 5000 * 0.1 = 500, then 500 + 25 = 525. To get $5,025 you would need =(C2+25)*0.1, which changes the logic entirely.',
      },
    ],
  },
  {
    id: 2,
    slug: 'essential-functions',
    title: 'Essential Functions',
    tagline: 'The core functions that power 80% of business analysis',
    level: 'Beginner',
    estimatedMinutes: 6,
    icon: '🔢',
    concepts: [
      {
        title: 'SUM & AVERAGE',
        body: '=SUM(range) adds all numeric values in a range. It is the most commonly used Excel function in business.\n\n=AVERAGE(range) calculates the arithmetic mean of all numbers in a range.\n\nBoth functions can take:\n• A specific range: =SUM(B2:B10)\n• An entire column: =SUM(B:B) — useful when your data grows\n• Multiple ranges: =SUM(B2:B10, D2:D10)\n• Individual cells: =SUM(B2, B5, B9)\n\nAutoSum shortcut: Select a cell below or to the right of a range, then press Alt+= (Windows) or Command+Shift+T (Mac). Excel auto-detects the adjacent range and writes the SUM formula for you.',
        formula: '=SUM(B2:B10)',
        tip: 'Use =SUM(B:B) when your data might grow. It sums the entire column without needing to update the range. Just make sure there are no numbers in your header row.',
      },
      {
        title: 'COUNT & COUNTA',
        body: '=COUNT(range) counts only cells that contain numbers. Cells with text, blanks, or errors are ignored.\n\n=COUNTA(range) counts all non-empty cells — including those with text, numbers, dates, formulas, or boolean values (TRUE/FALSE).\n\n=COUNTBLANK(range) counts empty cells. Useful for data quality checks.\n\nPractical use cases:\n• =COUNT(C2:C100) — how many rows have a numeric value entered?\n• =COUNTA(A2:A100) — how many rows have any data at all?\n• =COUNTA(A2:A100)-COUNT(C2:C100) — how many rows are missing a numeric value in column C?',
        formula: '=COUNTA(A2:A100)',
        tip: 'Use COUNTA on your ID or name column to quickly count how many records are in your dataset. This is a fast sanity check when you first receive a data file.',
      },
      {
        title: 'IF — Conditional Logic',
        body: '=IF(condition, value_if_true, value_if_false)\n\nThe condition is any expression that evaluates to TRUE or FALSE. You can use comparison operators: = (equal), <> (not equal), > (greater than), < (less than), >= (greater than or equal), <= (less than or equal).\n\nExamples:\n• =IF(B2>10000,"High","Low")\n• =IF(A2="Complete","Done","Pending")\n• =IF(C2<0,"Loss","Profit")\n\nNested IFs let you handle more than two outcomes:\n=IF(B2>50000,"Tier 1",IF(B2>20000,"Tier 2","Tier 3"))\n\nFor readability, limit nesting to 2-3 levels. For more complex logic, consider IFS() which accepts multiple condition-result pairs without deep nesting.',
        formula: '=IF(B2>50000,"Tier 1",IF(B2>20000,"Tier 2","Tier 3"))',
        tip: 'Always make sure your IF statement handles all possible cases. If a value could be exactly equal to your threshold, decide whether >= or > is correct for your business rule.',
      },
      {
        title: 'SUMIF & COUNTIF',
        body: '=SUMIF(range, criteria, sum_range)\nAdds values in sum_range for every row where range meets the criteria.\n\n=COUNTIF(range, criteria)\nCounts cells in range that meet the criteria.\n\nCriteria can be:\n• Exact text: "North"\n• A number: 100\n• A comparison: ">50000"\n• A wildcard: "*East*" (contains "East"), "North*" (starts with "North")\n• A cell reference: A2\n\nExamples:\n• =SUMIF(A:A,"North",B:B) — sum column B where column A = "North"\n• =COUNTIF(C:C,">50000") — count rows where column C > 50,000\n• =SUMIF(A:A,"*Consulting*",C:C) — sum column C where column A contains "Consulting"',
        formula: '=SUMIF(A2:A13,"North",C2:C13)',
        tip: 'When your criteria is a comparison like >50000, you must wrap it in double quotes: =COUNTIF(C:C,">50000"). Or combine a cell reference: =COUNTIF(C:C,">"&D1) where D1 contains 50000.',
      },
    ],
    workedExample: {
      title: 'Summarizing the Donor Database',
      scenario:
        'The nonprofit\'s development director needs a quick giving summary. Using sample.csv open in Excel, you\'ll calculate total and average gift size, break down giving by payment method (column E: Check, CreditCard, Eft, None), and flag major donors — all using essential functions.',
      steps: [
        {
          step: 1,
          instruction:
            'In an empty area (e.g., cell Y1), calculate the total amount raised across all transactions.',
          formula: '=SUM(C:C)',
          result: 'Total giving across all donor records — SUM skips the text header in C1 automatically',
        },
        {
          step: 2,
          instruction:
            'In Y2, find the average donation size.',
          formula: '=AVERAGE(C2:C10000)',
          result: 'Mean gift amount — useful for benchmarking against sector averages or prior years',
        },
        {
          step: 3,
          instruction:
            'In Y3, count how many transactions were made by check. The Method column is column E.',
          formula: '=COUNTIF(E:E,"Check")',
          result: 'Number of check payments — tells you how many donors still prefer traditional giving',
        },
        {
          step: 4,
          instruction:
            'In Y4, calculate the total amount raised specifically through CreditCard transactions.',
          formula: '=SUMIF(E:E,"CreditCard",C:C)',
          result: 'Total online/card giving — compare this to =SUMIF(E:E,"Check",C:C) to see channel split',
        },
        {
          step: 5,
          instruction:
            'In a new column (e.g., X), add a donor tier label for each row: "Major Donor" for gifts of $5,000 or more, "Standard" for anything less. Start in X2 and copy down.',
          formula: '=IF(C2>=5000,"Major Donor","Standard")',
          result: 'Tier label per row — then use =COUNTIF(X:X,"Major Donor") to count your major donors instantly',
        },
      ],
    },
    quiz: [
      {
        id: 'q2-1',
        question:
          'In the donor file, row 2 shows Geraldine Burrola with an Amount of $1. You apply =IF(C2>=5000,"Major Donor","Standard") to that row. What does it return?',
        options: ['Major Donor', 'Standard', 'TRUE', '#VALUE!'],
        correctIndex: 1,
        explanation:
          '1 is not >= 5000, so the condition is FALSE and Excel returns the value_if_false: "Standard". A $1 donation would not meet the major donor threshold.',
      },
      {
        id: 'q2-2',
        question:
          'You use =COUNTIF(E:E,"CreditCard") to count credit card transactions. Column E also contains "Check", "Eft", "None", and the header text "Method". How many times does "Method" get counted?',
        options: [
          'Once — COUNTIF counts all non-blank cells',
          'Zero — "Method" does not match "CreditCard"',
          'It depends on the number of rows',
          'COUNTIF throws an error on text headers',
        ],
        correctIndex: 1,
        explanation:
          'COUNTIF only counts cells that exactly match the criteria "CreditCard". The header text "Method" does not match, so it is not counted. This is why COUNTIF is safe to use on entire columns including header rows.',
      },
      {
        id: 'q2-3',
        question:
          'Which formula gives you the total Amount donated by California donors? (Primary.State is column Q, Amount is column C)',
        options: [
          '=SUMIF(Q:Q,"CA",C:C)',
          '=SUMIF(C:C,"CA",Q:Q)',
          '=SUM(Q:Q="CA",C:C)',
          '=COUNTIF(Q:Q,"CA")',
        ],
        correctIndex: 0,
        explanation:
          'SUMIF syntax is =SUMIF(range_to_check, criteria, range_to_sum). Column Q is checked for "CA", and for every matching row, the corresponding Amount in column C is added to the total.',
      },
    ],
  },
  {
    id: 3,
    slug: 'vlookup-xlookup',
    title: 'VLOOKUP & XLOOKUP',
    tagline: "Link data across tables — the consultant's most-used skill",
    level: 'Intermediate',
    estimatedMinutes: 7,
    icon: '🔍',
    concepts: [
      {
        title: 'Why Lookup Functions Matter',
        body: 'In real consulting projects, data rarely lives in one place. You might have:\n• A client master list (Client ID, Name, Industry)\n• A transactions table (Transaction ID, Client ID, Amount, Date)\n• A product catalog (Product ID, Name, Price)\n\nLookup functions let you merge these tables by a shared key — like Client ID — without copying and pasting. This eliminates the manual errors that come from misaligned rows and the maintenance burden of keeping multiple copies in sync.\n\nOnce set up, your lookup formula dynamically pulls the right value every time. Add new transactions, and the client names appear automatically. Change a client name in the master list, and it updates everywhere.\n\nThis is the difference between a spreadsheet that breaks under pressure and one that handles real-world data professionally.',
        tip: 'The shared key between two tables (like Client ID) must match exactly — same data type (text vs. number), same capitalization, no leading/trailing spaces. Use TRIM() and data type conversion to clean keys before looking up.',
      },
      {
        title: 'VLOOKUP Syntax & Logic',
        body: '=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])\n\n• lookup_value: the value you want to find (e.g., an AccountNumber in B2)\n• table_array: the reference table to search in (e.g., Tiers!A:C). The lookup value MUST be in the FIRST column of this range.\n• col_index_num: which column number in table_array to return (1 = first column, 2 = second, etc.)\n• range_lookup: use FALSE for exact match. Use TRUE (or omit) for approximate match — only appropriate for sorted numeric ranges like tax brackets.\n\nCommon errors:\n• #N/A — lookup value not found in the first column. Check for typos, extra spaces, or number-stored-as-text issues.\n• #REF! — col_index_num is larger than the number of columns in table_array.\n• Wrong results — used TRUE (approximate) instead of FALSE (exact).',
        formula: '=VLOOKUP(B2,Tiers!A:C,2,FALSE)',
        tip: 'Always use FALSE as the fourth argument unless you specifically need approximate matching. Using TRUE on unsorted data will return incorrect results silently — a dangerous bug.',
      },
      {
        title: 'VLOOKUP Limitations',
        body: 'VLOOKUP has three significant limitations that you will encounter in real projects:\n\n1. Cannot look LEFT: Your lookup column must be the leftmost column in table_array. If the column you want to return is to the LEFT of the lookup column, VLOOKUP cannot help — you need XLOOKUP or INDEX/MATCH.\n\n2. Fragile column numbers: col_index_num is a hard-coded integer. If someone inserts a column in the middle of your table_array, every VLOOKUP referencing columns after it will return the wrong data — silently. This is a real audit risk.\n\n3. Returns only the first match: If there are multiple rows with the same lookup value, VLOOKUP returns only the first one it finds. For aggregating multiple matches, use SUMIF or a PivotTable instead.\n\nFor new work, prefer XLOOKUP. For legacy files built with VLOOKUP, understand these risks.',
        tip: 'If you inherit a file with VLOOKUPs and need to add columns to the lookup table, add them at the right end to avoid shifting the col_index_num. Then update formulas to reference the new column number.',
      },
      {
        title: 'XLOOKUP — The Modern Upgrade',
        body: '=XLOOKUP(lookup_value, lookup_array, return_array, [not_found], [match_mode])\n\n• lookup_value: what you are searching for\n• lookup_array: the column (or row) to search in — can be anywhere, no restriction\n• return_array: the column (or row) to return values from — can be to the left of lookup_array\n• [not_found]: text to display if no match is found (e.g., "Unassigned"). This replaces wrapping in IFERROR.\n• [match_mode]: 0 = exact match (default), -1 = exact or next smaller, 1 = exact or next larger\n\nAdvantages over VLOOKUP:\n• Lookup and return columns can be anywhere — no left-column restriction\n• Built-in error handling via the [not_found] argument\n• Not fragile to column insertions (uses column references, not numbers)\n• Can return multiple columns at once by selecting a multi-column return_array\n\nAvailable in Excel 365 and Excel 2021+.',
        formula: '=XLOOKUP(B2,Tiers!A:A,Tiers!C:C,"Unassigned")',
        tip: 'XLOOKUP is only available in Excel 365 and Excel 2021+. If you are sharing files with colleagues on older versions, use VLOOKUP or INDEX/MATCH for compatibility.',
      },
    ],
    workedExample: {
      title: 'Enriching the Donor File with a Giving Tier Lookup',
      scenario:
        'The nonprofit has a separate "Tiers" sheet mapping AccountNumber to a GivingTier (Platinum/Gold/Silver) and an assigned RelationshipManager. Your job: use VLOOKUP and XLOOKUP to pull those columns into the main donor transaction sheet (sample.csv) using AccountNumber (column B) as the shared key.',
      steps: [
        {
          step: 1,
          instruction:
            'On a new sheet called "Tiers", create a lookup table. Column A: AccountNumber, Column B: GivingTier, Column C: RelationshipManager. Example rows: 653 → Platinum → Sarah Chen, 36197 → Gold → James Park, 27781 → Silver → Maria Lopez.',
          result: 'Lookup table ready — AccountNumber in the leftmost column as required by VLOOKUP',
        },
        {
          step: 2,
          instruction:
            'Back in the donor sheet, add a header "GivingTier" in column X (row 1). In X2, write a VLOOKUP to find the AccountNumber from column B in the Tiers table and return the tier (column 2 of the table).',
          formula: '=VLOOKUP(B2,Tiers!A:C,2,FALSE)',
          result: '"Platinum" for AccountNumber 653 (Marisla Foundation), #N/A for accounts not in the Tiers sheet',
        },
        {
          step: 3,
          instruction:
            'Copy X2 down to all donor rows. Scan for #N/A errors — these flag AccountNumbers in the donor file that have no match in the Tiers sheet. These are data quality gaps worth investigating.',
          result: 'GivingTier populated for matched accounts; #N/A highlights missing tier assignments',
        },
        {
          step: 4,
          instruction:
            'Add a header "RelationshipManager" in column Y. In Y2, use XLOOKUP to retrieve the manager name. Include "Unassigned" as the fallback so #N/A never appears in the output.',
          formula: '=XLOOKUP(B2,Tiers!A:A,Tiers!C:C,"Unassigned")',
          result: 'Manager name or "Unassigned" — cleaner than #N/A and safe to share with stakeholders',
        },
        {
          step: 5,
          instruction:
            'Update the GivingTier formula in X2 to wrap it in IFERROR, replacing any #N/A with "Not Assigned" for a clean report.',
          formula: '=IFERROR(VLOOKUP(B2,Tiers!A:C,2,FALSE),"Not Assigned")',
          result: 'No error codes visible — every row shows either a tier or "Not Assigned"',
        },
      ],
    },
    quiz: [
      {
        id: 'q3-1',
        question:
          'You write =VLOOKUP(B2,Tiers!A:C,2,FALSE) to look up a donor\'s GivingTier. The Tiers table has: A=AccountNumber, B=GivingTier, C=RelationshipManager. What does the "2" return?',
        options: [
          'The AccountNumber (column 1 of Tiers)',
          'The GivingTier (column 2 of Tiers)',
          'The RelationshipManager (column 3 of Tiers)',
          'The second row of the Tiers table',
        ],
        correctIndex: 1,
        explanation:
          'The third argument in VLOOKUP is col_index_num — it specifies which column of the table_array to return. Column 2 of Tiers!A:C is column B of the Tiers sheet, which contains GivingTier.',
      },
      {
        id: 'q3-2',
        question:
          'After copying your VLOOKUP down the donor sheet, several rows return #N/A. Looking at one of those rows, AccountNumber is 9999. What most likely caused the error?',
        options: [
          'The VLOOKUP formula has a syntax error',
          'AccountNumber 9999 does not exist in the first column of the Tiers table',
          'The Amount column is blank for that row',
          'You used FALSE — switch to TRUE for a more flexible match',
        ],
        correctIndex: 1,
        explanation:
          '#N/A means the lookup value (AccountNumber 9999) was not found in column A of the Tiers table. This is a data gap — either the account is new, or the Tiers sheet is incomplete. Never switch to TRUE to "fix" this — you would get incorrect matches instead.',
      },
      {
        id: 'q3-3',
        question:
          'You restructure the Tiers table so GivingTier is in column A and AccountNumber is in column B. Can you still use VLOOKUP to look up donors by AccountNumber?',
        options: [
          'Yes — specify col_index_num = 2 to search column B',
          'No — VLOOKUP always searches the leftmost (first) column of the table array',
          'Yes — use TRUE instead of FALSE to search any column',
          'Yes — VLOOKUP can search any column you specify',
        ],
        correctIndex: 1,
        explanation:
          'VLOOKUP always searches the first (leftmost) column of the table_array. If AccountNumber is in column B of the table, VLOOKUP cannot find it. This is its defining limitation — use XLOOKUP instead, which lets you specify any lookup column.',
      },
    ],
  },
  {
    id: 4,
    slug: 'pivottables',
    title: 'PivotTables',
    tagline: 'Summarize thousands of rows instantly — no formulas needed',
    level: 'Intermediate',
    estimatedMinutes: 7,
    icon: '📋',
    concepts: [
      {
        title: 'What is a PivotTable?',
        body: 'A PivotTable is an interactive summary table that lets you group, aggregate, and explore large datasets without writing a single formula.\n\nYou drag fields into four areas:\n• Rows: the categories you want to group by (e.g., Region, Product, Employee)\n• Columns: split your data across columns (e.g., Month, Quarter)\n• Values: the numbers you want to aggregate (e.g., Revenue, Hours, Units)\n• Filters: apply a filter to the entire table (e.g., show only Year = 2024)\n\nExcel recalculates the summary instantly as you rearrange fields. What would take hours with formulas takes minutes with a PivotTable.\n\nPivotTables are non-destructive — your source data is never changed. The PivotTable is a separate summary view that can be refreshed when the underlying data changes.',
        tip: 'Before creating a PivotTable, format your source data as an Excel Table (Ctrl+T on Windows / Cmd+T on Mac). This makes the data range dynamic — when you add rows, refreshing the PivotTable will automatically include the new data.',
      },
      {
        title: 'Creating a PivotTable',
        body: 'Step-by-step creation:\n1. Click anywhere inside your data range (Excel auto-detects the table boundaries)\n2. Go to Insert → PivotTable\n3. Confirm the data range and select "New Worksheet"\n4. Click OK\n\nThe PivotTable Field List panel opens on the right. At the top you see all column headers as available fields. At the bottom are the four areas.\n\nDrag a field from the top list into one of the four areas to add it. Drag it out to remove it. Drag between areas to change its role.\n\nBest practices for source data:\n• Row 1 must have headers — no blank header cells\n• No entirely blank rows or columns in the data\n• Each column should contain one type of data (all dates, all numbers, all text)\n• No merged cells',
        tip: 'If the PivotTable Field List disappears, click anywhere inside the PivotTable to bring it back. It only shows when a PivotTable cell is selected.',
      },
      {
        title: 'Value Calculations',
        body: 'When you drag a field to the Values area, Excel aggregates it. The default is:\n• SUM — for fields Excel recognizes as numbers\n• COUNT — for fields that contain text (or mixed content)\n\nTo change the aggregation: right-click (or Ctrl+click on Mac) any value cell in the PivotTable → Summarize Values By → choose from Sum, Count, Average, Max, Min, Product, Count Numbers, StdDev, Var.\n\nShow Values As — powerful for analysis:\n• % of Grand Total: each cell as a percentage of the overall total\n• % of Row Total: each cell as a percentage of its row total\n• % of Column Total: each cell as a percentage of its column total\n• Running Total: cumulative sum\n• Difference From: change vs. a base period (great for YoY comparisons)\n\nYou can add the same field to Values multiple times with different calculations (e.g., Sum of Amount AND % of Grand Total side by side).',
        tip: 'Right-click (or Ctrl+click on Mac) a value in the PivotTable and go to "Show Values As" → "% of Grand Total" for instant composition analysis. This is one of the most-used views in executive reporting.',
      },
      {
        title: 'Grouping, Sorting & Filtering',
        body: 'Date Grouping: Right-click (or Ctrl+click on Mac) a date field in the Rows area → Group → select grouping levels (Days, Months, Quarters, Years). Excel creates automatic hierarchy you can drill into.\n\nSorting: Click a dropdown arrow in a Row or Column header → Sort A to Z or Z to A. Or click a value cell → Data → Sort to sort the entire PivotTable by that value.\n\nFiltering: Click dropdown arrows in row/column headers to filter specific items. The Filters area adds a report-level filter.\n\nSlicers: Insert → Slicer → select fields. Slicers add visual button panels for one-click filtering. They can be shared across multiple PivotTables on the same sheet.\n\nPivotCharts: Select the PivotTable → Insert → PivotChart. Creates an interactive chart linked to the PivotTable — filters applied to the PivotTable automatically update the chart.',
        tip: 'Use Slicers when presenting to clients. They look polished and let stakeholders filter the view themselves during a meeting — turning your spreadsheet into an interactive dashboard.',
      },
    ],
    workedExample: {
      title: 'Analyzing Donor Giving by Payment Method',
      scenario:
        'The development director wants to know: How much came in through each payment channel? Which states give the most? How does giving split between individuals and organizations? Build a PivotTable from sample.csv to answer all three questions in under five minutes.',
      steps: [
        {
          step: 1,
          instruction:
            'Click any cell inside the donor data. Go to Insert → PivotTable → New Worksheet. Click OK. The Field List on the right shows all 23 column headers from the donor file.',
          result: 'Blank PivotTable canvas — all fields available including Amount, Method, Type, Primary.State, Date',
        },
        {
          step: 2,
          instruction:
            'Drag "Method" from the Field List to the Rows area.',
          result: 'Four rows appear: Check, CreditCard, Eft, None — one row per payment channel in the file',
        },
        {
          step: 3,
          instruction:
            'Drag "Amount" to the Values area.',
          result: 'Sum of Amount calculated per payment method — instantly see that Check transactions dominate total giving',
        },
        {
          step: 4,
          instruction:
            'Drag "Primary.State" to the Rows area (below Method). Collapse the Method grouping by clicking the minus icons to see state-level totals.',
          result: 'Giving broken down by state — CA drives the majority, with smaller amounts from NY, NJ, MA',
        },
        {
          step: 5,
          instruction:
            'Remove Primary.State from Rows. Drag "Type" to the Filters area. Use the filter dropdown at the top of the PivotTable to select "Individual" only.',
          result: 'Table now shows individual donor giving by payment method — Organizations excluded from the view',
        },
        {
          step: 6,
          instruction:
            'Right-click (or Ctrl+click on Mac) any Amount value in the PivotTable → Show Values As → % of Grand Total.',
          result: 'Each payment channel shown as a percentage of total giving — ideal for a board summary slide',
        },
      ],
    },
    quiz: [
      {
        id: 'q4-1',
        question:
          'You build a PivotTable from the donor file and want to see the total Amount raised through each payment method. Where do you drag the "Amount" field?',
        options: ['Rows area', 'Columns area', 'Values area', 'Filters area'],
        correctIndex: 2,
        explanation:
          'The Values area is where numeric fields go for aggregation. Dragging Amount there gives you Sum of Amount by default. The Rows area controls how rows are grouped (e.g., by Method), not what\'s being calculated.',
      },
      {
        id: 'q4-2',
        question:
          'The nonprofit adds 100 new donor records to the bottom of sample.csv. You switch back to the PivotTable sheet. Are the new records reflected automatically?',
        options: [
          'Yes — PivotTables update in real time',
          'No — right-click (or Ctrl+click on Mac) the PivotTable and select Refresh to update it',
          'No — delete and recreate the PivotTable to include new data',
          'Yes — but only if you dragged Amount to Values again',
        ],
        correctIndex: 1,
        explanation:
          'PivotTables do not update automatically. Right-click (or Ctrl+click on Mac) anywhere in the PivotTable and select Refresh (or use Data → Refresh All). If your source data is formatted as an Excel Table (Ctrl+T on Windows / Cmd+T on Mac), the range expands automatically — you still need to Refresh.',
      },
      {
        id: 'q4-3',
        question:
          'You want your PivotTable to show only donations from "Individual" donors, filtering out "Organization" records. The Type column has these two values. What is the most efficient approach?',
        options: [
          'Delete all Organization rows from the source data before creating the PivotTable',
          'Drag "Type" to the Filters area and select "Individual" from the dropdown',
          'Build a separate PivotTable using only the rows where Type = Individual',
          'Add a COUNTIF formula column next to the PivotTable',
        ],
        correctIndex: 1,
        explanation:
          'The Filters area (Report Filter) applies to the entire PivotTable non-destructively. The source data is untouched — you can switch between Individual, Organization, or both at any time. Slicers provide the same filtering with a more visual, client-friendly interface.',
      },
    ],
  },
  {
    id: 5,
    slug: 'charts-and-graphs',
    title: 'Charts & Graphs',
    tagline: 'Turn numbers into insights your clients will remember',
    level: 'Advanced',
    estimatedMinutes: 5,
    icon: '📈',
    concepts: [
      {
        title: 'Choosing the Right Chart Type',
        body: 'The wrong chart type obscures insights; the right one makes them obvious. Match the chart to the analytical question:\n\nBar/Column chart: Compare values across categories (Q4 revenue by region, headcount by department). Column = vertical bars (time flows left to right). Bar = horizontal bars (easier to read long category names).\n\nLine chart: Show trends over time (monthly growth, stock price). Requires a time axis. Multiple lines work well for comparison (Actual vs. Budget).\n\nPie/Donut chart: Show composition — parts of a whole. Use sparingly: only when shares sum to 100%, you have 5 or fewer slices, and the size differences are meaningful. For anything complex, use a stacked bar instead.\n\nScatter chart: Show correlation between two continuous variables (advertising spend vs. sales revenue).\n\nWaterfall chart: Show how positive and negative values contribute to a net total (P&L bridge, headcount changes, revenue build-up). A staple in consulting deliverables.\n\nDefault recommendation: when in doubt, use a column chart — it is the clearest and most universally understood format.',
        tip: 'Before choosing a chart type, write the question the chart answers. If the question is "which payment method raises the most?" — column chart. "How has giving changed month over month?" — line chart. The question dictates the format.',
      },
      {
        title: 'Creating a Chart',
        body: 'Step-by-step:\n1. Select your data range including headers (e.g., A1:C9)\n2. Go to Insert → Charts group → choose your chart type\n3. Excel creates a default chart on the current sheet\n\nOnce the chart is selected, two contextual tabs appear:\n• Chart Design: change chart type, switch rows/columns, select data, apply a chart style, move chart to another sheet\n• Format: format individual chart elements (title, axes, series, plot area)\n\nResizing: drag the corner handles of the chart border.\nMoving: click and drag the chart border (not a handle) to reposition.\nMoving to its own sheet: Chart Design → Move Chart → New Sheet (gives the chart its own full-page sheet — useful for dashboards).\n\nTo select individual elements (title, a specific data series, axis): click once to select the whole chart, then click again on the specific element.',
        tip: "Right-click (or Ctrl+click on Mac) directly on a chart element (a bar, a line, the title) to get a context menu with formatting options specific to that element. This is faster than navigating the ribbon tabs.",
      },
      {
        title: 'Formatting for Client Deliverables',
        body: "A chart for internal analysis can be rough. A chart going to a client or into a board deck must be polished. The difference is in what you remove as much as what you add.\n\nRemove chart junk:\n• Delete major gridlines (click a gridline → Delete)\n• Remove the chart border (Format Chart Area → No Border)\n• Simplify or remove the legend if it duplicates information already in a title or labels\n\nAdd clarity:\n• Write a specific title: not 'Amount' but 'Total Donations by Payment Method ($)'\n• Add data labels directly on bars or lines — they eliminate guesswork and often make the y-axis redundant\n• Set axis min/max manually to avoid misleading truncation (Format Axis → Bounds)\n\nColor discipline:\n• Use 2-3 colors maximum\n• Use your client's brand colors or a clean neutral palette\n• Make the most important series the most visually prominent (thicker line, darker color)\n• Desaturate supporting series (gray for targets, benchmarks, or prior periods)",
        tip: "Copy your chart in Excel (Ctrl+C on Windows / Cmd+C on Mac), then use Paste Special in PowerPoint (Ctrl+Alt+V on Windows / Cmd+Option+V on Mac) → Picture (PNG or EMF). This creates a static image that cannot be accidentally edited during a client meeting — a critical protection.",
      },
      {
        title: 'Chart Elements & Polish',
        body: 'Fine-tuning chart elements:\n\nChart Title: double-click to edit in place. You can link it to a cell: type = in the formula bar while the title is selected, then click the cell — the title dynamically updates when the cell changes.\n\nAxis: double-click an axis to open Format Axis. Set Minimum and Maximum bounds manually to control the scale. Display Units (Thousands, Millions) keeps the axis readable for large numbers.\n\nData Labels: right-click (or Ctrl+click on Mac) a data series → Add Data Labels. Right-click (or Ctrl+click on Mac) the labels → Format Data Labels to choose position (Above, Inside End, Outside End) and content (Value, Percentage, Series Name, Category Name).\n\nLegend: if you have one series, delete the legend — the chart title should make the series clear. If you have multiple series, move the legend to the bottom (less space wasted on the side).\n\nExporting: right-click (or Ctrl+click on Mac) the chart → Copy. In PowerPoint, use Paste Special (Ctrl+Alt+V on Windows / Cmd+Option+V on Mac) → select Picture (Enhanced Metafile or PNG) for a crisp, non-editable image safe from accidental changes.',
        tip: "To update all charts consistently, use chart templates: format one chart perfectly, right-click (or Ctrl+click on Mac) → Save as Template. Then right-click (or Ctrl+click on Mac) other charts → Change Chart Type → Templates to apply the same formatting.",
      },
    ],
    workedExample: {
      title: 'Donation Channel Chart for the Board Report',
      scenario:
        'Your PivotTable now shows total Amount by payment Method (Check, CreditCard, Eft, None). The board wants a visual they can absorb in seconds — which giving channel drives the most revenue? Build a polished column chart from the PivotTable summary.',
      steps: [
        {
          step: 1,
          instruction:
            'From your PivotTable, select the summary data: the Method labels and their Sum of Amount values (including the column headers). Go to Insert → Column Chart → Clustered Column.',
          result: 'A basic 4-bar column chart appears — one bar per payment method',
        },
        {
          step: 2,
          instruction:
            'Double-click the chart title and type a specific, informative title.',
          result: '"Total Donations by Payment Method ($)" — not the default "Sum of Amount"',
        },
        {
          step: 3,
          instruction:
            'Right-click (or Ctrl+click on Mac) the bars → Add Data Labels → Outside End. Right-click (or Ctrl+click on Mac) the labels → Format Data Labels → select "Value".',
          result: 'Dollar amounts appear above each bar — board members can read exact figures without squinting at the axis',
        },
        {
          step: 4,
          instruction:
            'Click any gridline → Delete to remove all gridlines. Right-click (or Ctrl+click on Mac) the chart border → Format Chart Area → No Border.',
          result: 'Clean, minimal chart — the data speaks without visual noise',
        },
        {
          step: 5,
          instruction:
            'Right-click (or Ctrl+click on Mac) the "Check" bar (likely the tallest) → Format Data Series → Fill → Solid Fill → set color to navy (#1B2A4A). Set the other bars to light gray (#D3D3D3).',
          result: 'Visual hierarchy: the dominant giving channel stands out; others provide context without competing for attention',
        },
        {
          step: 6,
          instruction:
            'Right-click (or Ctrl+click on Mac) the chart → Copy. In PowerPoint, use Paste Special (Ctrl+Alt+V on Windows / Cmd+Option+V on Mac) → Picture (PNG).',
          result: 'Board-ready static image — locked against accidental edits during the presentation',
        },
      ],
    },
    quiz: [
      {
        id: 'q5-1',
        question:
          'The nonprofit wants to show the board how their four payment channels (Check, CreditCard, Eft, None) each contribute to total giving as a share of 100%. Which chart type is most appropriate?',
        options: ['Line chart', 'Scatter chart', 'Pie or donut chart', 'Waterfall chart'],
        correctIndex: 2,
        explanation:
          'Pie and donut charts are designed for composition — how parts sum to a whole. With only four categories, this works well. Avoid pie charts when you have more than 5-6 slices or when the differences are very small and hard to distinguish visually.',
      },
      {
        id: 'q5-2',
        question:
          'You are preparing the donation channel chart for a board presentation. Which of these elements should you typically REMOVE to make it client-ready?',
        options: [
          'The chart title',
          'Data labels showing dollar amounts',
          'Heavy gridlines and the chart border',
          'The payment method category labels',
        ],
        correctIndex: 2,
        explanation:
          'Heavy gridlines and chart borders add visual clutter without adding information. Removing them produces a cleaner, more professional look. The title and data labels should stay — they improve readability. Category labels are essential for understanding what each bar represents.',
      },
      {
        id: 'q5-3',
        question:
          'The nonprofit\'s total giving grew from $150,000 to $420,000. Three new foundation grants added $300,000, but a lapsed major donor account removed $30,000. Which chart type best tells this build-up story?',
        options: ['Clustered column chart', 'Waterfall chart', 'Line chart', 'Pie chart'],
        correctIndex: 1,
        explanation:
          'A Waterfall chart shows how an initial value is incremented by positive and negative contributors to arrive at a final total. It is the go-to chart for P&L bridges, headcount changes, and giving build-ups — a staple in nonprofit and consulting board presentations.',
      },
    ],
  },
];
