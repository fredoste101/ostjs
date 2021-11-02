
class TableGenerator
{
    constructor()
    {
        this.htmlTable          = null;

        this.tableHead          = null;
        this.tableBody          = null;


        this.headerElementList  = [];


        this.dataRowList        = [];   //{htmlList, sortList}}


        this.htmlHeaderRowList  = [];


        this.tdClassList        = [];
        this.trClassList        = [];


        this.sortColumn         = 0;
        this.isSortAscending    = true;
    }


    init(table, rowValuesList)
    {
        //TODO: init on existing table (html Element)
    }


    addHeader(headerElement)
    {
        this.headerElementList.push(headerElement);
    }


    addRow(row, values)
    {
        this.dataRowList.push({"htmlList":row, "sortList":values});
    }


    addRowClass(className)
    {
        this.trClassList.push(className);
    }


    addDataClass(className)
    {
        this.tdClassList.push(className);
    }


    getHtml()
    {
        this.htmlTable  = document.createElement("table");

        this.tableHead = this.getTableHead();

        this.tableBody = this.getTableBody();

        //TODO: tfoot!

        this.htmlTable.append(this.tableHead, this.tableBody);

        return this.htmlTable;
    }


    getTableHead()
    {
        let thead       = document.createElement("thead");
        let headerRow   = document.createElement("tr");

        for (let i = 0; i < this.trClassList.length; i++)
        {
            headerRow.classList.add(this.trClassList[i]);
        }

        for(let i = 0; i < this.headerElementList.length; i++)
        {
            let th = document.createElement("th");

            this.htmlHeaderRowList.push(th);

            th.append(this.headerElementList[i]);

            headerRow.appendChild(th);
        }

        thead.appendChild(headerRow);

        return thead;
    }

    
    getTableBody()
    {
       let tbody = document.createElement("tbody");

        for(let i = 0; i < this.dataRowList.length; i++)
        {
            let dataRow = document.createElement("tr");

            for (let i = 0; i < this.trClassList.length; i++)
            {
                dataRow.classList.add(this.trClassList[i]);
            }

            let data = this.dataRowList[i];

            for (let j = 0; j < data.htmlList.length; j++)
            {
                let td = document.createElement("td");

                for (let i = 0; i < this.tdClassList.length; i++)
                {
                    td.classList.add(this.tdClassList[i]);
                }

                td.appendChild(data.htmlList[j]);
                dataRow.appendChild(td);
            }

            tbody.appendChild(dataRow);
        }

        return tbody; 
    }


    setSortable()
    {
        var obj = this;
        for (let i = 0; i < this.htmlHeaderRowList.length; i++)
        {

            this.htmlHeaderRowList[i].addEventListener("click", function(){obj.sort(i, true);});
        }
    }



    sort(colIndex, asc)
    {
        this.sortColumn         = colIndex;
        this.isSortAscending    = asc;

        var obj = this;

        this.dataRowList.sort(function(a, b){return obj.sorter(a, b);});

        this.htmlTable.removeChild(this.tableBody);


        this.tableBody = this.getTableBody();

        this.htmlTable.append(this.tableBody);

    }


    sorter(a, b)
    {
        if (this.isSortAscending)
        {
            return this.sorterAscending(a, b);
        }
        else
        {
            return this.sorterDescending(a, b);
        }
    }


    sorterDescending(a, b)
    {
        return a.sortList[this.sortColumn] > b.sortList[this.sortColumn];
    }


    sorterAscending(a, b)
    {
        return a.sortList[this.sortColumn] < b.sortList[this.sortColumn];
    }
}