package es.urjc.tfg.scarrascosa.unitTesting;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import es.urjc.tfg.scarrascosa.DTO.StudentListDTO;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class StudentListDTOUnitTests {
    
    @Test
    public void testGetStudentList() {
        List<String> students = Arrays.asList("name1", "name2", "name3");
        StudentListDTO studentListDTO = new StudentListDTO(students);
        Assertions.assertEquals(students, studentListDTO.getStudentList());
    }

    @Test
    public void testSetStudentList() {
        List<String> students = Arrays.asList("name1", "name2", "name3");
        StudentListDTO studentListDTO = new StudentListDTO();
        studentListDTO.setStudentList(students);
        Assertions.assertEquals(students, studentListDTO.getStudentList());
    }

}
