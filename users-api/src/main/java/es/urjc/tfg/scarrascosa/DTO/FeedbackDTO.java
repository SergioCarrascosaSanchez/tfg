package es.urjc.tfg.scarrascosa.DTO;

public class FeedbackDTO {
    private String feedback;
    
    public FeedbackDTO() {}
    
    public FeedbackDTO(String feedback) {
        this.feedback = feedback;
    }
    
    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }
}
