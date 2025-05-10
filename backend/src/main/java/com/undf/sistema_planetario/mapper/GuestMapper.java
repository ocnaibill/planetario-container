package com.undf.sistema_planetario.mapper;

import com.undf.sistema_planetario.dto.GuestRequestDto;
import com.undf.sistema_planetario.dto.GuestResponseDto;
import com.undf.sistema_planetario.model.Guest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface GuestMapper {
    GuestMapper INSTANCE = Mappers.getMapper(GuestMapper.class);

    @Mapping(target = "id", ignore = true)
    Guest toEntity(GuestRequestDto dto);

    GuestResponseDto toResponseDto(Guest guest);
}
