
export class SearchFilter{
    constructor(keyword,perPage,pageNum,sortType,sortField){
        this.keyword=keyword;
        this.perPage=perPage;
        this.pageNum=pageNum;
        this.brand_ids=[];
        this.category_ids=[];
        this.sortType=sortType;
        this.sortField=sortField;
    }
}