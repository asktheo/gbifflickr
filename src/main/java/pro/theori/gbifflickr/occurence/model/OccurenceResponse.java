package pro.theori.gbifflickr.occurence.model;

import lombok.Data;

import java.util.List;

@Data
public class OccurenceResponse {

    private Integer offset;
    private Integer limit;
    private Boolean endOfRecords;
    private Integer count;
    private List<GbifOccurence> results;
}
