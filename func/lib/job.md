``` 
job_cell
        int64                             //jobId
        int64                             //start
        int64                             //end
        int1                              //status
        cell                              //content
                cell                      //link
                        int32             //count
                        cell              //first link
                        cell              //second link
                        cell              //third link
                        cell              //fourth link
                int64                     //result
        cell                              //address cell
                cell                      //first address cell
                        address
                        address
                        address
                cell                      //second address cell
                        address
                        address
        
        cell
                address                   //who
                int64                     //time
                grams                     //value
                slice                     //msg_body
        cell
                cell                      //status cell
                        int1               
                        int1 
                        int1
                        int1
                        int1
                        int1
                cell                      //result cell
                        int64
                        int64
                        int64
                        int64
                        int64

```
``` 
simple
        int64
        int64
        int64
        int1
        cell
                cell
        cell                            //address
                cell
                cell
        cell                            //info
        cell                            //status_result_cell
                cell                    //status
                cell                    //result
 ```
