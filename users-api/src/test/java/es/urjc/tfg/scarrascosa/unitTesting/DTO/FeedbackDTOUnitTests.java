package es.urjc.tfg.scarrascosa.unitTesting.DTO;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import es.urjc.tfg.scarrascosa.DTO.FeedbackDTO;

public class FeedbackDTOUnitTests {
    @Test
    public void testGetFeedback() {
        String feedback = "This is a feedback";
        FeedbackDTO feedbackDTO = new FeedbackDTO(feedback);
        Assertions.assertEquals(feedback, feedbackDTO.getFeedback());
    }

    @Test
    public void testSetFeedback() {
        String feedback = "This is a feedback";
        FeedbackDTO feedbackDTO = new FeedbackDTO();
        feedbackDTO.setFeedback(feedback);
        Assertions.assertEquals(feedback, feedbackDTO.getFeedback());
    }
}
