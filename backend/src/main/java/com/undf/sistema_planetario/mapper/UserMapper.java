package com.undf.sistema_planetario.mapper;

import com.undf.sistema_planetario.dto.UserRequestDto;
import com.undf.sistema_planetario.dto.UserResponseDto;
import com.undf.sistema_planetario.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {
    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "password", ignore = true)
    User toEntity(UserRequestDto dto);

    UserResponseDto toResponseDto(User user);
}
