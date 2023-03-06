package es.urjc.tfg.scarrascosa;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

import java.time.Duration;

import static org.awaitility.Awaitility.*;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.SpyBean;
import es.urjc.tfg.scarrascosa.ScheduledTasks.ScheduledTasks;


@SpringBootTest
class ScheduledTasksTests {
    
    @SpyBean
    private ScheduledTasks scheduledTasks;
    
    @Test
    void testGetByLastValuesEvery10s() {
        await()
        .between(Duration.ofSeconds(0), Duration.ofSeconds(11))
        .untilAsserted(() -> verify(scheduledTasks, times(1)).fetchLastValues());

        verify(scheduledTasks, times(1)).fetchApiCall();
    }
}
