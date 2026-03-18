package com.example.demo;

import com.example.demo.model.Item;
import com.example.demo.repository.ItemRepository;
import com.example.demo.service.ItemService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.List;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class ItemServiceTest {

    @Mock
    private ItemRepository itemRepository;

    @InjectMocks
    private ItemService itemService;

    @Test
    void getAllItems_returnsListOfItems() {
        // ARRANGE — set up fake data
        Item item = new Item("Test Item", "Test Description");
        when(itemRepository.findAll()).thenReturn(List.of(item));

        // ACT — call the method
        List<Item> result = itemService.getAllItems();

        // ASSERT — verify result
        assertEquals(1, result.size());
        assertEquals("Test Item", result.get(0).getName());
        verify(itemRepository, times(1)).findAll();
    }

    @Test
    void createItem_savesAndReturnsItem() {
        // ARRANGE
        Item item = new Item("New Item", "New Description");
        when(itemRepository.save(item)).thenReturn(item);

        // ACT
        Item result = itemService.createItem(item);

        // ASSERT
        assertNotNull(result);
        assertEquals("New Item", result.getName());
        verify(itemRepository, times(1)).save(item);
    }
}
```



